import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Star } from 'lucide-react';
import { CAMPUSES, CampusInfo, PARENT_REVIEWS } from '../data/academyData';

gsap.registerPlugin(ScrollTrigger);

interface CampusesAndReviewsProps {
  onApplyCampus: (campus: CampusInfo) => void;
}

export const CampusesAndReviews: React.FC<CampusesAndReviewsProps> = ({
  onApplyCampus,
}) => {
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const reviewsTopRef = useRef<HTMLDivElement>(null);
  const reviewsGridRef = useRef<HTMLDivElement>(null);

  const [selectedUnit, setSelectedUnit] = useState<string>('Tümü');

  const unitFilters = useMemo(
    () => [
      { id: 'Tümü', label: 'Tüm Birimler' },
      { id: 'gunesli-merkez', label: 'Ana Kampüs' },
      { id: 'gunesli-bale-sahne', label: 'Bale & Sahne' },
      { id: 'gunesli-muzik-konservatuvar', label: 'Müzik & LCM' },
    ],
    []
  );

  const visibleCampuses = useMemo(() => {
    if (selectedUnit === 'Tümü') return CAMPUSES;
    return CAMPUSES.filter((c) => c.id === selectedUnit);
  }, [selectedUnit]);

  // Refresh ScrollTrigger positions when campus count changes above
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [selectedUnit]);

  // GSAP Scrubbed Parent Reviews
  useEffect(() => {
    const section = reviewsSectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      if (reviewsTopRef.current) {
        tl.fromTo(
          reviewsTopRef.current,
          { y: 65 },
          { y: 0, duration: 1, ease: 'power2.out' },
          0
        ).to(reviewsTopRef.current, { y: -25, duration: 1 }, 1);
      }

      if (reviewsGridRef.current) {
        tl.fromTo(
          reviewsGridRef.current,
          { y: 135, rotate: -2.2 },
          { y: 0, rotate: 0, duration: 1, ease: 'power2.out' },
          0
        ).to(reviewsGridRef.current, { y: -45, duration: 1 }, 1);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-[#FFFFFF] text-[#111111]">
      {/* Interactive Güneşli Sınav Koleji Campus Explorer */}
      <section
        id="okullarimiz"
        aria-labelledby="campuses-heading"
        className="py-16 lg:py-24 border-b border-[#E4E4E0]"
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[3px] bg-[#FF6B00]" aria-hidden="true" />
                <span className="font-display text-xs font-bold tracking-[0.14em] text-[#595959]">
                  GÜNEŞLİ SINAV KOLEJİ · İSTANBUL YERLEŞKESİ
                </span>
              </div>
              <h2
                id="campuses-heading"
                className="font-display font-extrabold tracking-[-0.035em] text-[#111111]"
                style={{ fontSize: 'clamp(1.85rem, 3.4vw, 3rem)' }}
              >
                Kampüsümüz ve Sanat Stüdyolarımız
              </h2>
            </div>

            {/* Functional Unit Filter Buttons */}
            <div
              role="group"
              aria-label="Kampüs birimi filtresi"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F5F3] rounded-xl border border-[#E4E4E0]"
            >
              {unitFilters.map((unit) => {
                const active = selectedUnit === unit.id;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setSelectedUnit(unit.id)}
                    className={`px-3.5 py-1.5 text-xs font-display font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'text-[#595959] hover:text-[#111111]'
                    }`}
                  >
                    {unit.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCampuses.map((campus) => (
              <article
                key={campus.id}
                className="border border-[#E4E4E0] rounded-2xl p-6 bg-white flex flex-col justify-between gap-6 hover:border-[#FF6B00]/50 transition-colors"
              >
                <div className="space-y-3">
                  {/* Unboxed clean metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#595959]">
                    <span className="font-display font-bold text-[#D95300]">
                      {campus.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{campus.district}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#111111]">
                    {campus.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#111111]/75">
                    {campus.studios}
                  </p>

                  <p className="text-sm text-[#595959] leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{campus.address}</span>
                  </p>

                  {/* Programs rendered as clean typographic list separated by mid-dots */}
                  <p className="pt-1 text-xs text-[#595959] leading-relaxed">
                    {campus.programs.join(' · ')}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E4E0] flex items-center justify-between gap-3">
                  <a
                    href={`tel:${campus.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#111111] hover:text-[#D95300] tabular-nums whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B00]" aria-hidden="true" />
                    <span>{campus.phone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onApplyCampus(campus)}
                    className="px-4 py-2 rounded-full bg-[#111111] text-white font-display font-bold text-xs hover:bg-[#FF6B00] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Tanışma Dersi Al
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Parent & Student Testimonials */}
      <section
        ref={reviewsSectionRef}
        aria-labelledby="reviews-heading"
        className="py-16 lg:py-26 overflow-hidden bg-[#F5F5F3]"
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 space-y-12">
          <div
            ref={reviewsTopRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 will-change-transform"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[3px] bg-[#FF6B00]" aria-hidden="true" />
                <span className="font-display text-xs font-bold tracking-[0.14em] text-[#595959]">
                  DENEYİMLER
                </span>
              </div>
              <h2
                id="reviews-heading"
                className="font-display font-extrabold tracking-[-0.035em] text-[#111111]"
                style={{ fontSize: 'clamp(1.85rem, 3.4vw, 3rem)' }}
              >
                Veli ve Öğrenci Yorumları
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#E4E4E0] rounded-2xl px-5 py-3 self-start md:self-auto">
              <div className="flex items-center gap-0.5 text-[#FF6B00]" aria-label="5 üzerinden 4.9 yıldız">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <div className="text-xs">
                <p className="font-display font-bold text-[#111111] tabular-nums">
                  4.9 / 5.0 Kampüs Memnuniyeti
                </p>
                <p className="text-[#595959]">Güneşli kampüsümüzden doğrulanmış veli değerlendirmeleri</p>
              </div>
            </div>
          </div>

          <div
            ref={reviewsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 will-change-transform"
          >
            {PARENT_REVIEWS.map((rev) => (
              <blockquote
                key={rev.id}
                className="bg-white border border-[#E4E4E0] rounded-2xl p-7 sm:p-8 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="text-xs font-medium text-[#595959]">
                    <span>{rev.campus}</span>
                  </div>
                  <p className="text-base text-[#111111] leading-relaxed">
                    “{rev.quote}”
                  </p>
                </div>

                <footer className="pt-4 border-t border-[#E4E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <cite className="not-italic font-display font-bold text-sm text-[#111111] block">
                      {rev.parentName}
                    </cite>
                    <span className="text-xs text-[#595959]">{rev.role}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#D95300]">
                    {rev.outcome}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
