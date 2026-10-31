import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATE_PROGRAMS, MEDIA_ASSETS } from '../data/academyData';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesSectionProps {
  onApplyWithAccreditation: (programName: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  onApplyWithAccreditation,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const [expandedNo, setExpandedNo] = useState<string>('01');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      // Clip-path inset expansion on scroll scrub (tsalp-intl clone)
      gsap.fromTo(
        el,
        { clipPath: 'inset(11% 12% 11% 12% round 56px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 28%',
            scrub: 0.7,
          },
        }
      );

      // Background subtle vertical scrub
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -7, scale: 1.12 },
          {
            yPercent: 7,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Differential parallax & untilt on left copy vs right RAD/LCM/MEB card
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.65,
        },
      });

      if (leftCopyRef.current) {
        tl.fromTo(
          leftCopyRef.current,
          { y: 120 },
          { y: 0, duration: 1, ease: 'power2.out' },
          0
        ).to(leftCopyRef.current, { y: -45, duration: 1 }, 1);
      }

      if (rightCardRef.current) {
        tl.fromTo(
          rightCardRef.current,
          { y: 220, rotate: 5.5 },
          { y: 0, rotate: 0, duration: 1, ease: 'power2.out' },
          0
        ).to(rightCardRef.current, { y: -70, duration: 1 }, 1);
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="sertifikalar"
      aria-labelledby="certificates-heading"
      className="py-16 lg:py-24 px-3 sm:px-6 lg:px-10 bg-white"
    >
      <div
        ref={sectionRef}
        className="relative max-w-[1400px] mx-auto rounded-[28px] overflow-hidden bg-[#111111] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-16 will-change-transform"
      >
        {/* Parallax Stage Backdrop */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <SafeImage
            src={MEDIA_ASSETS.musicPiano}
            alt="Konservatuvar resital sahnesi"
            objectPosition="center 40%"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#111111]/92 via-[#111111]/75 to-[#111111]/65 pointer-events-none"
        />

        {/* Two-Column Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div ref={leftCopyRef} className="lg:col-span-6 space-y-5 will-change-transform">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#FF6B00]" aria-hidden="true" />
              <span className="font-display text-xs font-bold tracking-[0.15em] text-[#FF6B00]">
                SERTİFİKA PROGRAMLARI
              </span>
            </div>

            <h2
              id="certificates-heading"
              className="font-display font-extrabold tracking-[-0.035em] leading-[1.05] text-white"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.35rem)', textWrap: 'balance' }}
            >
              Uluslararası Sertifika ve MEB Diploması
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[48ch]">
              Derslerimiz uluslararası akreditasyon kurumlarının ve T.C. Milli Eğitim
              Bakanlığı’nın müfredatına tam uyumlu olarak yürütülür; öğrencilerimizin sanatsal
              emeği dünyada geçerli diplomalarla belgelenir.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-white/70">
              <span>Londra Sınav Merkezi</span>
              <span aria-hidden="true">·</span>
              <span>UCAS Üniversite Puan Katkısı</span>
              <span aria-hidden="true">·</span>
              <span>Resmi MEB Kurs Bitirme Belgesi</span>
            </div>
          </div>

          {/* Right Tilted-to-Straight Interactive Card */}
          <div ref={rightCardRef} className="lg:col-span-6 will-change-transform">
            <div className="bg-white text-[#111111] rounded-2xl p-6 sm:p-9 shadow-[0_32px_70px_rgba(0,0,0,0.45)]">
              <div className="flex flex-wrap items-baseline gap-2 font-display font-black text-2xl sm:text-3xl tracking-tight text-[#111111]">
                <span>RAD /</span>
                <span>LCM /</span>
                <span className="text-[#D95300]">MEB</span>
              </div>
              <p className="mt-1 text-xs font-display font-bold tracking-[0.14em] text-[#595959]">
                ULUSLARARASI SERTİFİKA VE DİPLOMA PROGRAMLARI
              </p>

              <div className="my-5 h-px bg-[#E4E4E0]" />

              <div className="divide-y divide-[#E4E4E0]">
                {CERTIFICATE_PROGRAMS.map((prog) => {
                  const isOpen = expandedNo === prog.no;
                  return (
                    <div key={prog.no} className="py-4 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setExpandedNo(isOpen ? '' : prog.no)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start gap-4 text-left cursor-pointer group"
                      >
                        <span className="font-mono text-sm font-bold text-[#D95300] pt-0.5 tabular-nums shrink-0">
                          {prog.no}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#D95300] transition-colors">
                              {prog.title}
                            </h3>
                            <span
                              aria-hidden="true"
                              className={`text-lg font-medium text-[#111111]/60 transition-transform duration-200 ${
                                isOpen ? 'rotate-45' : ''
                              }`}
                            >
                              +
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-[#595959] leading-relaxed">
                            {prog.shortDesc}
                          </p>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="mt-3 pl-8 space-y-3">
                          <p className="text-sm text-[#111111]/85 leading-relaxed bg-[#F5F5F3] rounded-xl p-4">
                            {prog.details}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs font-medium text-[#595959]">
                              {prog.metrics}
                            </span>
                            <button
                              type="button"
                              onClick={() => onApplyWithAccreditation(prog.title)}
                              className="text-xs font-display font-extrabold text-[#111111] underline decoration-[#FF6B00] decoration-2 underline-offset-4 hover:text-[#D95300] cursor-pointer"
                            >
                              Sınav &amp; Seviye Bilgisi Al →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
