import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CAMPUSES, HERO_SLIDES } from '../data/academyData';
import { SafeImage } from './SafeImage';
import { submitLeadToServer } from '../utils/submitLead';

gsap.registerPlugin(ScrollTrigger);

interface CinemaHeroProps {
  onOpenKvkk: () => void;
  onOpenQuickApply: () => void;
  selectedDisciplineExternal?: string;
}

const BIRTH_YEARS = Array.from({ length: 65 }, (_, i) => String(2023 - i));

const DISCIPLINE_OPTIONS = [
  'Bale (3 Yaş Mini – Teknik – Yetişkin)',
  'Dans (Street Jazz, Hip-Hop, Modern, Latin, Tango)',
  'Müzik (Piyano, Keman, Gitar, Vokal & LCM)',
  'Müzikal Tiyatro',
  'Yaratıcı Drama',
  'Konservatuvara Hazırlık',
];

export const CinemaHero: React.FC<CinemaHeroProps> = ({
  onOpenKvkk,
  onOpenQuickApply,
  selectedDisciplineExternal,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgSliderRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [school, setSchool] = useState(CAMPUSES[0].name);
  const [studentName, setStudentName] = useState('');
  const [birthYear, setBirthYear] = useState('2018');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState(DISCIPLINE_OPTIONS[0]);
  const [kvkkAccepted, setKvkkAccepted] = useState(true);
  const [formError, setFormError] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    school: string;
    discipline: string;
  } | null>(null);

  useEffect(() => {
    if (selectedDisciplineExternal) {
      const match = DISCIPLINE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(selectedDisciplineExternal.toLowerCase())
      );
      if (match) setDiscipline(match);
    }
  }, [selectedDisciplineExternal]);

  // Crossfade stage photography timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  // GSAP CinemaHero Entrance + ScrollTrigger Backdrop Parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bgSliderRef.current) {
        tl.fromTo(
          bgSliderRef.current,
          { scale: 1.15 },
          { scale: 1.03, duration: 2.4, ease: 'power2.out' },
          0
        );
      }

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75 },
          0.15
        );
      }

      const words = el.querySelectorAll('[data-hero-word]');
      if (words.length) {
        tl.fromTo(
          words,
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, stagger: 0.08 },
          0.25
        );
      }

      if (leadRef.current) {
        tl.fromTo(
          leadRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          0.6
        );
      }

      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          0.72
        );
      }

      if (formCardRef.current) {
        tl.fromTo(
          formCardRef.current,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, clearProps: 'transform' },
          0.45
        );
      }

      if (bgSliderRef.current) {
        gsap.to(bgSliderRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (studentName.trim().length < 2) {
      setFormError('Lütfen öğrenci adını ve soyadını girin.');
      return;
    }
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setFormError('Lütfen geçerli bir telefon numarası girin (ör. 05XX XXX XX XX).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    if (!kvkkAccepted) {
      setFormError('Devam etmek için Aydınlatma Metni onay kutusunu işaretleyin.');
      return;
    }

    void submitLeadToServer({
      type: 'Ön Kayıt (Hero)',
      name: studentName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      campus: school,
      discipline,
      ageOrYear: birthYear,
    });

    setSubmittedData({
      name: studentName.trim(),
      school,
      discipline,
    });
  };

  const scrollToCampuses = () => {
    document.querySelector('#okullarimiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDisciplines = () => {
    document.querySelector('#branslar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroWords = ['Sanatın', 'Kalbine', 'Hoş', 'Geldiniz.'];

  return (
    <section
      id="top"
      ref={heroRef}
      aria-label="Bissa Akademi Giriş"
      className="relative min-h-[100svh] bg-[#111111] text-white overflow-hidden flex items-center pt-24 pb-16 lg:py-28"
    >
      {/* Crossfading Stage Photography Slider */}
      <div
        ref={bgSliderRef}
        className="absolute -inset-y-[10%] inset-x-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === activeSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <SafeImage
                src={slide.image}
                alt={slide.caption}
                objectPosition={slide.pos}
                className={`w-full h-full object-cover transition-transform duration-[7200ms] ease-out ${
                  isCurrent ? 'scale-100' : 'scale-105'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Measured Theatre Scrim for WCAG AA Contrast */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#111111] via-[#111111]/60 to-[#111111]/65"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#111111]/85 via-[#111111]/45 to-transparent"
        aria-hidden="true"
      />

      {/* Signature Rotating Geometric Stage Ring */}
      <div
        className="absolute -top-24 -right-24 w-[420px] sm:w-[560px] aspect-square text-white/15 pointer-events-none z-0 animate-tsa-ring"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="200" cy="200" r="154" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="200" cy="10" r="4" fill="#FF6B00" />
          <circle cx="390" cy="200" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Split */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Focal Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <div ref={eyebrowRef} className="inline-flex items-center gap-3">
            <span className="w-9 h-[3px] bg-[#FF6B00] shrink-0" aria-hidden="true" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-[0.14em] text-white/90">
              BALE, DANS VE MÜZİK EĞİTİMİ
            </span>
          </div>

          <h1
            className="font-display font-extrabold tracking-[-0.04em] leading-[0.96] text-white max-w-[13ch]"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.25rem)', textWrap: 'balance' }}
          >
            {heroWords.map((word, idx) => (
              <span
                key={word}
                className="inline-block overflow-hidden align-top mr-[0.22em] pb-[0.08em]"
              >
                <span
                  data-hero-word
                  className={`inline-block will-change-transform ${
                    idx === 1 ? 'text-[#FF6B00]' : ''
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={leadRef}
            className="text-base sm:text-lg text-white/85 max-w-[54ch] leading-relaxed"
          >
            3 yaşından yetişkinlere; Royal Academy of Dance (RAD), London College of Music
            (LCM) ve T.C. Milli Eğitim Bakanlığı onaylı akademik sanat programları.
          </p>

          <div ref={actionsRef} className="flex flex-wrap items-center gap-3.5 pt-2">
            {/* Mobile-only Popup Trigger for Tanışma Dersi */}
            <button
              type="button"
              onClick={onOpenQuickApply}
              className="lg:hidden px-7 py-3.5 bg-[#FF6B00] text-white font-display font-extrabold text-sm tracking-wide rounded-full hover:bg-[#ff7d1f] active:scale-[0.98] transition-all duration-150 inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Tanışma Dersi &amp; Ön Kayıt</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToDisciplines}
              className="hidden lg:inline-flex px-7 py-3.5 bg-[#FF6B00] text-white font-display font-extrabold text-sm tracking-wide rounded-full hover:bg-[#ff7d1f] transition-all duration-150 items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Branşları Keşfet</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToDisciplines}
              className="lg:hidden px-6 py-3.5 border border-white/50 text-white font-display font-bold text-sm tracking-wide rounded-full hover:bg-white hover:text-[#111111] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Branşları Keşfet
            </button>

            <button
              type="button"
              onClick={scrollToCampuses}
              className="hidden sm:inline-flex px-7 py-3.5 border border-white/50 text-white font-display font-bold text-sm tracking-wide rounded-full hover:bg-white hover:text-[#111111] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Güneşli Kampüsümüz
            </button>
          </div>

          {/* Slide switcher & caption bar */}
          <div className="pt-6 flex items-center gap-4 text-xs text-white/70">
            <div className="flex items-center gap-2" role="tablist" aria-label="Sahne görselleri">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={s.caption}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeSlide === idx ? 'w-9 bg-[#FF6B00]' : 'w-3 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <span aria-hidden="true">·</span>
            <span className="truncate">{HERO_SLIDES[activeSlide].caption}</span>
          </div>
        </div>

        {/* Right Interactive Pre-Registration Card (Hidden on Mobile, Popup Used Instead) */}
        <div ref={formCardRef} id="basvuru-formu" className="hidden lg:block lg:col-span-5">
          <div className="bg-[#161616]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl">
            {submittedData ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Ön Kayıt Talebiniz Alındı
                </h2>
                <p className="text-sm text-white/80 leading-relaxed max-w-sm mx-auto">
                  Sayın <strong className="text-white">{submittedData.name}</strong> için{' '}
                  <strong className="text-[#FF6B00]">{submittedData.school}</strong> eğitim
                  danışmanlarımız <strong>{submittedData.discipline}</strong> deneme dersi ve
                  seviye planlaması için en kısa sürede sizinle iletişime geçecektir.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedData(null);
                    setStudentName('');
                    setPhone('');
                    setEmail('');
                  }}
                  className="mt-2 px-6 py-2.5 border border-white/30 rounded-full text-xs font-display font-bold text-white hover:bg-white hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Yeni Başvuru Oluştur
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-display font-bold tracking-wider text-[#FF6B00]">
                    TANIŞMA DERSİ &amp; SEVİYE TESPİTİ
                  </p>
                  <h2 className="font-display text-xl font-bold text-white">
                    Güneşli Sınav Koleji Kampüsümüze Başvurun
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="hero-school"
                      className="block text-xs font-medium text-white/75 mb-1"
                    >
                      Bölüm / Yerleşke Seçimi
                    </label>
                    <select
                      id="hero-school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                    >
                      {CAMPUSES.map((c) => (
                        <option key={c.id} value={c.name} className="bg-[#161616] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="hero-year"
                      className="block text-xs font-medium text-white/75 mb-1"
                    >
                      Öğrenci Doğum Yılı
                    </label>
                    <select
                      id="hero-year"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white tabular-nums focus:outline-none focus:border-[#FF6B00]"
                    >
                      {BIRTH_YEARS.map((yr) => (
                        <option key={yr} value={yr} className="bg-[#161616] text-white">
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero-name"
                    className="block text-xs font-medium text-white/75 mb-1"
                  >
                    Öğrenci Adı Soyadı
                  </label>
                  <input
                    id="hero-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Örn. Defne Yılmaz"
                    className="w-full h-10 px-3.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="hero-phone"
                      className="block text-xs font-medium text-white/75 mb-1"
                    >
                      Telefon
                    </label>
                    <input
                      id="hero-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0552 219 54 34"
                      className="w-full h-10 px-3.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 tabular-nums focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-email"
                      className="block text-xs font-medium text-white/75 mb-1"
                    >
                      E-Posta
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@eposta.com"
                      className="w-full h-10 px-3.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero-discipline"
                    className="block text-xs font-medium text-white/75 mb-1"
                  >
                    İlgilendiğiniz Branş
                  </label>
                  <select
                    id="hero-discipline"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  >
                    {DISCIPLINE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#161616] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-white/70 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-0.5 rounded accent-[#FF6B00]"
                  />
                  <span>
                    Kişisel verilerimin işlenmesine ilişkin{' '}
                    <button
                      type="button"
                      onClick={onOpenKvkk}
                      className="underline text-[#FF6B00] hover:text-white cursor-pointer"
                    >
                      Aydınlatma Metni
                    </button>
                    ’ni okudum ve iletişim kurulmasını onaylıyorum.
                  </span>
                </label>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-[#ff937a]">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-11 bg-[#FF6B00] text-white font-display font-extrabold text-sm tracking-wide rounded-full hover:bg-[#ff7d1f] active:scale-[0.99] transition-all duration-150 cursor-pointer"
                >
                  ÖN KAYIT TALEBİ GÖNDER
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
