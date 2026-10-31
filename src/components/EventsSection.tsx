import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ACADEMY_EVENTS, AcademyEvent } from '../data/academyData';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface EventsSectionProps {
  onSelectEvent: (event: AcademyEvent) => void;
}

const FILTER_TABS = [
  'Tümü',
  'DUYURU',
  'GÖSTERİ',
  'WORKSHOP',
  'GEZİ & AÇIK DERS',
] as const;

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrubTrackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_TABS)[number]>('Tümü');

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'Tümü') return ACADEMY_EVENTS;
    return ACADEMY_EVENTS.filter((ev) => ev.category === activeFilter);
  }, [activeFilter]);

  // GSAP Horizontal Viewport Scrub on Entry (tsahome-events clone)
  useEffect(() => {
    const section = sectionRef.current;
    const track = scrubTrackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      gsap.fromTo(
        track,
        { x: () => Math.min(340, window.innerWidth * 0.28) },
        {
          x: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center 58%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  const scrollHorizontal = (dir: -1 | 1) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  return (
    <section
      id="etkinlikler"
      ref={sectionRef}
      aria-labelledby="events-heading"
      className="py-16 lg:py-24 bg-[#FFFFFF] text-[#111111] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 space-y-8">
        {/* Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#FF6B00]" aria-hidden="true" />
              <span className="font-display text-xs font-bold tracking-[0.14em] text-[#595959]">
                AKADEMİDEN
              </span>
            </div>
            <h2
              id="events-heading"
              className="font-display font-extrabold tracking-[-0.035em] text-[#111111]"
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 3rem)' }}
            >
              Etkinlikler ve Duyurular
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            {/* Functional Segmented Filter Buttons */}
            <div
              role="group"
              aria-label="Etkinlik kategorisi filtresi"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F5F3] rounded-xl border border-[#E4E4E0]"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab;
                const label =
                  tab === 'Tümü'
                    ? 'Tümü'
                    : tab === 'DUYURU'
                    ? 'Duyurular'
                    : tab === 'GÖSTERİ'
                    ? 'Gösteriler'
                    : tab === 'WORKSHOP'
                    ? 'Atölyeler'
                    : 'Açık Ders';
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3.5 py-1.5 text-xs font-display font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#595959] hover:text-[#111111]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Horizontal Carousel Navigation */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollHorizontal(-1)}
                aria-label="Önceki etkinlikler"
                className="w-10 h-10 rounded-full border border-[#E4E4E0] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollHorizontal(1)}
                aria-label="Sonraki etkinlikler"
                className="w-10 h-10 rounded-full border border-[#E4E4E0] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* GSAP Scrubbed Horizontal Track */}
        <div ref={scrubTrackRef} className="will-change-transform">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory"
          >
            {filteredEvents.map((ev) => (
              <article
                key={ev.id}
                className="w-[300px] sm:w-[355px] shrink-0 snap-start group"
              >
                <button
                  type="button"
                  onClick={() => onSelectEvent(ev)}
                  className="w-full text-left space-y-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
                >
                  <div className="relative aspect-[6/5] rounded-2xl overflow-hidden bg-[#F5F5F3] border border-[#E4E4E0]">
                    <SafeImage
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    />
                    <time
                      dateTime={ev.dateText}
                      className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[#111111] rounded-xl px-3 py-2 text-center leading-none shadow-md"
                    >
                      <strong className="block font-display font-black text-xl tabular-nums">
                        {ev.day}
                      </strong>
                      <span className="block mt-0.5 text-[10px] font-display font-bold tracking-wider text-[#595959]">
                        {ev.month}
                      </span>
                    </time>
                  </div>

                  {/* Clean Unboxed Metadata per Zero-Pill Discipline */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#595959]">
                    <span className="font-display font-bold text-[#D95300]">
                      {ev.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{ev.campus}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg leading-snug text-[#111111] group-hover:underline decoration-[#FF6B00] decoration-2 underline-offset-4">
                    {ev.title}
                  </h3>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
