import React, { useEffect, useRef, useState } from 'react';
import {
  CourseItem,
  DISCIPLINE_PANELS,
  PAIR_DISCIPLINES,
} from '../data/academyData';
import { SafeImage } from './SafeImage';

interface DisciplineStackProps {
  onSelectCourse: (course: CourseItem) => void;
  onApplyDiscipline: (disciplineName: string) => void;
}

export const DisciplineStack: React.FC<DisciplineStackProps> = ({
  onSelectCourse,
  onApplyDiscipline,
}) => {
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [hoveredCourse, setHoveredCourse] = useState<CourseItem | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'dance-0': false,
    'music-0': true,
  });

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Sticky top offset calculation when a panel exceeds 100vh
  useEffect(() => {
    const updateStickTop = () => {
      for (const panel of panelRefs.current) {
        if (!panel) continue;
        const stickTop = Math.min(0, window.innerHeight - panel.offsetHeight);
        panel.style.setProperty('--stick-top', `${stickTop}px`);
      }
    };

    updateStickTop();
    const ro = new ResizeObserver(updateStickTop);
    panelRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('resize', updateStickTop);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateStickTop);
    };
  }, [openGroups]);

  // Layered Sticky Card --cover & --shift Scroll Choreography
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const updateCoverAndShift = () => {
      const vh = window.innerHeight;
      const panels = panelRefs.current;

      panels.forEach((panel, idx) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        const nextPanel = panels[idx + 1];
        const cover = nextPanel
          ? Math.min(1, Math.max(0, (vh - nextPanel.getBoundingClientRect().top) / vh))
          : 0;
        const shift = -11 * Math.max(-1, Math.min(1, rect.top / vh));

        panel.style.setProperty('--cover', cover.toFixed(3));
        panel.style.setProperty('--shift', `${shift.toFixed(2)}%`);
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateCoverAndShift);
      }
    };

    updateCoverAndShift();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="branslar"
      aria-labelledby="disciplines-heading"
      className="relative bg-black text-white"
    >
      <h2 id="disciplines-heading" className="sr-only">
        Bale, Dans, Müzik, Müzikal Tiyatro ve Yaratıcı Drama Branşları
      </h2>

      <div className="relative bg-black">
        {DISCIPLINE_PANELS.map((panel, panelIdx) => {
          const activePreview =
            hoveredCourse &&
            (panel.directCourses.some((c) => c.id === hoveredCourse.id) ||
              panel.groups?.some((g) => g.items.some((c) => c.id === hoveredCourse.id)))
              ? hoveredCourse
              : null;

          return (
            <article
              key={panel.key}
              ref={(el) => {
                panelRefs.current[panelIdx] = el;
              }}
              aria-labelledby={`discipline-title-${panel.key}`}
              style={{
                top: 'var(--stick-top, 0px)',
                transform: 'scale(calc(1 - var(--cover, 0) * 0.11))',
                borderRadius: 'calc(var(--cover, 0) * 32px)',
              }}
              className={`sticky min-h-[100svh] bg-[#111111] text-white flex items-center overflow-hidden origin-top isolate will-change-transform ${
                panelIdx > 0 ? 'shadow-[0_-32px_70px_rgba(0,0,0,0.55)]' : ''
              }`}
            >
              {/* Dynamic Darkening Scrim when Next Panel Covers */}
              <div
                aria-hidden="true"
                style={{ opacity: 'calc(var(--cover, 0) * 0.78)' }}
                className="absolute inset-0 bg-black z-20 pointer-events-none"
              />

              {/* Full-bleed Stage Backdrop + Hover Course Preview Crossfade */}
              <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
                <div
                  style={{ transform: 'translateY(var(--shift, 0%))' }}
                  className="absolute -inset-y-[14%] inset-x-0 will-change-transform"
                >
                  <SafeImage
                    src={panel.image}
                    alt={panel.name}
                    objectPosition={panel.photoPos}
                    className="w-full h-full object-cover"
                  />
                  {activePreview && activePreview.image !== panel.image && (
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-100">
                      <SafeImage
                        src={activePreview.image}
                        alt={activePreview.title}
                        objectPosition={activePreview.photoPos || 'center 35%'}
                        className="w-full h-full object-cover scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>

                {/* Directional Theatre Scrim */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
              </div>

              {/* Panel Foreground Split */}
              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 lg:px-8 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Editorial Number, Discipline Title & Description */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#FF6B00] tracking-wider tabular-nums">
                    <span>{panel.number}. BÖLÜM</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-white/70">BİSSA AKADEMİ</span>
                  </div>

                  <h3
                    id={`discipline-title-${panel.key}`}
                    className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-white"
                    style={{ fontSize: 'clamp(3rem, 5.8vw, 5.75rem)' }}
                  >
                    {panel.name}
                  </h3>

                  <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[48ch]">
                    {panel.description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onApplyDiscipline(panel.name)}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/80 font-display font-extrabold text-xs sm:text-sm tracking-wider text-white hover:bg-white hover:text-[#111111] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer group"
                    >
                      <span className="text-[#FF6B00] group-hover:text-[#111111] text-lg leading-none">
                        +
                      </span>
                      <span>{panel.allLabel} &amp; BAŞVURU</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive Course List & Expandable Groups */}
                <div className="lg:col-span-7">
                  <div className="border-t border-white/20">
                    {/* Expandable Accordion Groups (e.g., Jazz Dans, Enstrüman) */}
                    {panel.groups?.map((group, gIdx) => {
                      const groupKey = `${panel.key}-${gIdx}`;
                      const isExpanded = !!openGroups[groupKey];
                      return (
                        <div key={group.groupTitle} className="border-b border-white/20">
                          <button
                            type="button"
                            onClick={() => toggleGroup(groupKey)}
                            aria-expanded={isExpanded}
                            className="w-full py-3.5 flex items-center justify-between gap-4 text-left font-display font-extrabold text-base text-white hover:text-[#FF6B00] transition-colors cursor-pointer"
                          >
                            <span>{group.groupTitle}</span>
                            <span
                              aria-hidden="true"
                              className={`text-[#FF6B00] text-xl font-medium leading-none transition-transform duration-200 ${
                                isExpanded ? 'rotate-45' : 'rotate-0'
                              }`}
                            >
                              +
                            </span>
                          </button>

                          {isExpanded && (
                            <ul className="pb-3 pl-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                              {group.items.map((course) => (
                                <li key={course.id}>
                                  <button
                                    type="button"
                                    onClick={() => onSelectCourse(course)}
                                    onMouseEnter={() => setHoveredCourse(course)}
                                    onMouseLeave={() => setHoveredCourse(null)}
                                    onFocus={() => setHoveredCourse(course)}
                                    onBlur={() => setHoveredCourse(null)}
                                    className="w-full py-2.5 border-b border-white/15 flex items-baseline justify-between gap-3 text-left text-sm font-semibold text-white/90 hover:text-white hover:border-[#FF6B00] hover:pl-2 transition-all duration-150 cursor-pointer"
                                  >
                                    <span>{course.title}</span>
                                    <span className="text-xs text-white/55 shrink-0">
                                      {course.ageRange}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}

                    {/* Direct Courses */}
                    <ul
                      className={`grid gap-x-10 ${
                        panel.groups ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                      }`}
                    >
                      {panel.directCourses.map((course) => (
                        <li key={course.id}>
                          <button
                            type="button"
                            onClick={() => onSelectCourse(course)}
                            onMouseEnter={() => setHoveredCourse(course)}
                            onMouseLeave={() => setHoveredCourse(null)}
                            onFocus={() => setHoveredCourse(course)}
                            onBlur={() => setHoveredCourse(null)}
                            className="w-full py-3.5 border-b border-white/20 flex items-baseline justify-between gap-4 text-left text-[15px] font-semibold text-white hover:border-[#FF6B00] hover:pl-2.5 transition-all duration-150 cursor-pointer group"
                          >
                            <span className="group-hover:text-[#FF6B00] transition-colors">
                              {course.title}
                            </span>
                            <span className="text-xs font-medium text-white/60 shrink-0">
                              {course.ageRange}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-xs text-white/55">
                    Müfredat, haftalık ders süresi ve sertifika detaylarını incelemek için bir
                    programa tıklayın.
                  </p>
                </div>
              </div>
            </article>
          );
        })}

        {/* Panel 4: Split-Screen Pair (Müzikal Tiyatro & Yaratıcı Drama) */}
        <article
          ref={(el) => {
            panelRefs.current[DISCIPLINE_PANELS.length] = el;
          }}
          aria-label="Müzikal Tiyatro ve Yaratıcı Drama"
          style={{
            top: 'var(--stick-top, 0px)',
          }}
          className="sticky min-h-[100svh] bg-[#111111] text-white shadow-[0_-32px_70px_rgba(0,0,0,0.6)] overflow-hidden isolate"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
            {PAIR_DISCIPLINES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCourse(item)}
                className={`relative min-h-[50svh] lg:min-h-[100svh] p-8 sm:p-12 lg:p-16 flex flex-col justify-end text-left overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#FF6B00] ${
                  idx > 0 ? 'border-t lg:border-t-0 lg:border-l border-white/15' : ''
                }`}
              >
                <div
                  aria-hidden="true"
                  style={{ transform: 'translateY(var(--shift, 0%))' }}
                  className="absolute -inset-y-[12%] inset-x-0 z-0 will-change-transform"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    objectPosition={item.photoPos || 'center center'}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
                />

                <div className="relative z-10 space-y-3 max-w-xl">
                  <div className="text-xs font-mono text-[#FF6B00] tracking-wider">
                    0{idx + 4}. SAHNE ATÖLYESİ · {item.ageRange}
                  </div>
                  <h3
                    className="font-display font-extrabold tracking-[-0.03em] leading-none text-white underline decoration-transparent decoration-[3px] underline-offset-8 group-hover:decoration-[#FF6B00] transition-all duration-200"
                    style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <span className="inline-block pt-1 font-display text-xs font-bold tracking-wider text-[#FF6B00]">
                    ATÖLYE DETAYINI İNCELE →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
