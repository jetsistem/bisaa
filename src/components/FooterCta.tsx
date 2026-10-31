import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterCtaProps {
  onOpenQuickApply: () => void;
  onOpenKvkk: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({
  onOpenQuickApply,
  onOpenKvkk,
}) => {
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Clip-path expanding CTA section
      if (ctaSectionRef.current) {
        gsap.fromTo(
          ctaSectionRef.current,
          { clipPath: 'inset(8% 18% 8% 18% round 80px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaSectionRef.current,
              start: 'top bottom',
              end: 'top 66%',
              scrub: 0.6,
            },
          }
        );
      }

      if (ctaWrapRef.current && ctaSectionRef.current) {
        gsap.fromTo(
          ctaWrapRef.current,
          { y: 110, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaSectionRef.current,
              start: 'top bottom',
              end: 'top 62%',
              scrub: 0.6,
            },
          }
        );
      }

      // Giant Footer Wordmark Rising Reveal
      if (wordmarkTextRef.current && wordmarkWrapRef.current) {
        gsap.fromTo(
          wordmarkTextRef.current,
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wordmarkWrapRef.current,
              start: 'top bottom',
              end: 'top 68%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Clip-Path Expanding CTA Banner */}
      <section
        ref={ctaSectionRef}
        aria-labelledby="footer-cta-heading"
        className="bg-[#FF6B00] text-white py-20 lg:py-28 px-5 lg:px-8 will-change-transform"
      >
        <div
          ref={ctaWrapRef}
          className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center will-change-transform"
        >
          <div className="lg:col-span-7 space-y-4">
            <p className="font-display text-xs font-extrabold tracking-[0.16em] text-white/85">
              BİZE KATILIN
            </p>
            <h2
              id="footer-cta-heading"
              className="font-display font-extrabold tracking-[-0.035em] leading-[1.03] text-white"
              style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)', textWrap: 'balance' }}
            >
              Size uygun dersi birlikte bulalım.
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-[52ch] leading-relaxed">
              Güneşli Sınav Koleji İstanbul kampüsümüzde yaşa ve ilgiye uygun branşı, seviye
              grubunu ve haftalık ders programını eğitim danışmanlarımızla birlikte belirleyin.
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end space-y-5">
            <div className="space-y-1.5 text-sm font-semibold text-white/95">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Bağcılar / İstanbul</span>
              </p>
              <p className="flex items-center gap-2 font-mono tabular-nums">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href="tel:05522195434" className="hover:underline">
                  0552 219 54 34
                </a>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenQuickApply}
                className="px-8 py-4 rounded-full bg-[#111111] text-white font-display font-extrabold text-sm tracking-wide hover:bg-[#262626] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                TANIŞMA DERSİ PLANLA
              </button>
              <a
                href="tel:05522195434"
                className="px-7 py-4 rounded-full border border-white text-white font-display font-bold text-sm hover:bg-white hover:text-[#111111] transition-colors whitespace-nowrap shrink-0 tabular-nums"
              >
                0552 219 54 34
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Dark Footer */}
      <footer className="bg-[#111111] text-white pt-16 lg:pt-22 pb-10 px-5 lg:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto space-y-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <p className="font-display font-extrabold text-lg tracking-tight text-white">
                BİSSA AKADEMİ
              </p>
              <p className="text-sm text-white/65 leading-relaxed max-w-xs">
                Bale, dans ve müziğin sevilip yaygınlaşmasını; öğrencilerimizin bedensel,
                zihinsel ve sosyal gelişimlerine katkı sağlamayı misyon edindik.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold tracking-wider text-[#FF6B00]">
                EĞİTİM BÖLÜMLERİ
              </h3>
              <ul className="space-y-2 text-sm text-white/75">
                <li>
                  <a href="#branslar" className="hover:text-white transition-colors">
                    Bale Bölümü (RAD)
                  </a>
                </li>
                <li>
                  <a href="#branslar" className="hover:text-white transition-colors">
                    Dans Bölümü
                  </a>
                </li>
                <li>
                  <a href="#branslar" className="hover:text-white transition-colors">
                    Müzik Bölümü (LCM)
                  </a>
                </li>
                <li>
                  <a href="#branslar" className="hover:text-white transition-colors">
                    Müzikal Tiyatro &amp; Drama
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold tracking-wider text-[#FF6B00]">
                AKADEMİ
              </h3>
              <ul className="space-y-2 text-sm text-white/75">
                <li>
                  <a href="#hikayemiz" className="hover:text-white transition-colors">
                    27 Yıllık Hikayemiz
                  </a>
                </li>
                <li>
                  <a href="#sertifikalar" className="hover:text-white transition-colors">
                    Uluslararası Sertifikalar
                  </a>
                </li>
                <li>
                  <a href="#etkinlikler" className="hover:text-white transition-colors">
                    Etkinlikler ve Duyurular
                  </a>
                </li>
                <li>
                  <a href="#okullarimiz" className="hover:text-white transition-colors">
                    Kampüsümüz &amp; Stüdyolar
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold tracking-wider text-[#FF6B00]">
                ADRES &amp; İLETİŞİM
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Güneşli, Bağcılar /
                İstanbul
              </p>
              <a
                href="tel:05522195434"
                className="inline-block font-mono text-sm font-bold text-[#FF6B00] hover:text-white transition-colors tabular-nums"
              >
                0552 219 54 34
              </a>
            </div>
          </div>

          {/* Rising Monumental Wordmark */}
          <div
            ref={wordmarkWrapRef}
            aria-hidden="true"
            className="overflow-hidden border-t border-white/10 pt-8"
          >
            <div
              ref={wordmarkTextRef}
              className="font-display font-black tracking-[-0.045em] leading-[0.88] text-white/[0.12] select-none whitespace-nowrap text-center will-change-transform"
              style={{ fontSize: 'clamp(2.4rem, 10vw, 8.5rem)' }}
            >
              BİSSA AKADEMİ
            </div>
          </div>

          {/* Quiet Legal Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} Bissa Akademi. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={onOpenKvkk}
                className="hover:text-white transition-colors cursor-pointer"
              >
                KVKK Aydınlatma Metni
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onOpenQuickApply}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Ön Kayıt Formu
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
