import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../data/academyData';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface SocialMottoSectionProps {
  onExploreCampuses: () => void;
}

export const SocialMottoSection: React.FC<SocialMottoSectionProps> = ({
  onExploreCampuses,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      // Clip-path rounded inset reveal (SocialSection-module clone)
      gsap.fromTo(
        el,
        { clipPath: 'inset(9% 6% 9% 6% round 68px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 32px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 35%',
            scrub: 0.7,
          },
        }
      );

      // Stacked Motto Words Stagger ("EN MUTLU OLDUĞUM YER")
      const words = el.querySelectorAll('[data-social-word]');
      if (words.length) {
        gsap.fromTo(
          words,
          { yPercent: 70, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              end: 'top 20%',
              scrub: 0.8,
            },
          }
        );
      }

      const scrubBase = {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
      };

      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { y: 95 },
          {
            y: -95,
            ease: 'none',
            scrollTrigger: { ...scrubBase, scrub: 0.6 },
          }
        );
      }

      if (photoWrapRef.current) {
        gsap.fromTo(
          photoWrapRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { ...scrubBase, scrub: true },
          }
        );
      }

      if (stickerRef.current) {
        gsap.fromTo(
          stickerRef.current,
          { y: 145 },
          {
            y: -145,
            ease: 'none',
            scrollTrigger: { ...scrubBase, scrub: 0.5 },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-6 bg-white">
      <section
        ref={sectionRef}
        aria-labelledby="motto-heading"
        className="social-bg-glow max-w-[1400px] mx-auto rounded-[32px] py-16 sm:py-20 lg:py-26 px-6 sm:px-12 lg:px-20 text-white relative overflow-hidden will-change-transform"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Monumental Stacked Motto */}
          <div className="lg:col-span-7 space-y-7">
            <h2
              id="motto-heading"
              className="font-display font-black tracking-[-0.035em] leading-[0.92] text-white"
              style={{ fontSize: 'clamp(2.75rem, 5.4vw, 5.5rem)' }}
            >
              <span data-social-word className="block text-[#FF6B00] will-change-transform">
                EN
              </span>
              <span data-social-word className="block text-[#FF6B00] will-change-transform">
                MUTLU
              </span>
              <span data-social-word className="block text-white will-change-transform">
                OLDUĞUM
              </span>
              <span data-social-word className="block text-white will-change-transform">
                YER.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/75 max-w-[38ch] leading-relaxed">
              Prova salonlarından büyük tiyatro sahnelerine uzanan sanatsal yolculuğumuzu ve
              öğrencilerimizin sahne heyecanını paylaşın.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreCampuses}
                className="px-6 py-3 rounded-full bg-[#FF6B00] text-white font-display font-extrabold text-xs sm:text-sm tracking-wide hover:bg-[#ff7d1f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Kampüs Atmosferini İncele
              </button>
              <a
                href="#etkinlikler"
                className="px-6 py-3 rounded-full border border-white/25 text-white font-display font-bold text-xs sm:text-sm hover:bg-white hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
              >
                Sahne Takvimi
              </a>
            </div>
          </div>

          {/* Right Tilted Portrait Frame + Glow + Counter-Parallax Sticker */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px]">
              {/* Radial Orange Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-6 -right-6 -bottom-6 rounded-full bg-[#FF6B00]/35 blur-2xl pointer-events-none"
              />

              {/* Tilted Stage Frame */}
              <div
                ref={frameRef}
                className="relative aspect-[827/800] rounded-[28px] overflow-hidden rotate-[2.2deg] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.75)] ring-1 ring-white/15 will-change-transform"
              >
                <div
                  ref={photoWrapRef}
                  className="w-full h-full scale-[1.14] will-change-transform"
                >
                  <SafeImage
                    src={MEDIA_ASSETS.socialHappy}
                    alt="Bissa Akademi öğrencileri sahne provasında"
                    objectPosition="center 32%"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Counter-Parallax Academy Crest Sticker */}
              <div
                ref={stickerRef}
                className="absolute -bottom-4 left-2 sm:bottom-8 sm:-left-7 bg-[#FF6B00] text-white rounded-2xl px-5 py-3.5 shadow-2xl will-change-transform"
              >
                <p className="font-display font-black text-sm tracking-tight leading-none">
                  BİSSA AKADEMİ
                </p>
                <p className="mt-1 text-[11px] font-semibold text-white/90">
                  Güneşli Sınav Koleji · İstanbul
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
