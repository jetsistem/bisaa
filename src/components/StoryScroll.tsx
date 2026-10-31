import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../data/academyData';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface StoryScrollProps {
  onOpenHeritageModal: () => void;
}

const HEADLINE_WORDS = [
  '27',
  'yıldır',
  'bale,',
  'dans',
  've',
  'müziği',
  'sevdiriyoruz.',
];

export const StoryScroll: React.FC<StoryScrollProps> = ({ onOpenHeritageModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageImgWrapRef = useRef<HTMLDivElement>(null);
  const floatLeftRef = useRef<HTMLDivElement>(null);
  const floatRightRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDListElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1000px) and (min-height: 620px)', () => {
      // Synchronously enable 360vh + sticky 100vh layout BEFORE ScrollTrigger measures geometry
      section.classList.add('is-pinned-story');

      const q = gsap.utils.selector(section);
      const pinEl = pinRef.current!;
      const headlineEl = headlineRef.current!;
      const words = q('[data-story-word]');
      const factItems = q('[data-story-fact]');
      const numEls = q('[data-story-num]') as HTMLElement[];

      const getInitialHeadlineY = () => {
        if (!pinEl || !headlineEl) return 180;
        return 0.45 * pinEl.clientHeight - (headlineEl.offsetTop + headlineEl.offsetHeight / 2);
      };

      gsap.set(words, { opacity: 0.14 });

      // Word-by-word illumination scrubbed as StoryScroll enters and pins
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.55,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 48%',
          end: 'top -42%',
          scrub: 0.75,
        },
      });

      // Master 3-Act Pinned Timeline scrubbed across the 360vh scroll track
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          },
        },
      });

      // Act I (0 -> 2.8): Hold centered enlarged headline while floating studio portraits drift upward
      tl.fromTo(
        headlineEl,
        { y: getInitialHeadlineY, scale: 1.85 },
        { y: getInitialHeadlineY, scale: 1.85, duration: 2.8 },
        0
      );

      if (floatLeftRef.current) {
        tl.fromTo(
          floatLeftRef.current,
          { yPercent: 42, rotate: -6, opacity: 1 },
          { yPercent: -165, rotate: 2.5, duration: 5.8 },
          0
        );
      }

      if (floatRightRef.current) {
        tl.fromTo(
          floatRightRef.current,
          { yPercent: 92, rotate: 5, opacity: 1 },
          { yPercent: -250, rotate: -3, duration: 5.8 },
          0
        );
      }

      tl.to(
        [floatLeftRef.current, floatRightRef.current].filter(Boolean),
        { opacity: 0, duration: 1.1 },
        4.4
      );

      // Act II (2.8 -> 5.4): Headline docks to top while central panoramic stage expands via clipPath
      tl.to(
        headlineEl,
        { y: 0, scale: 1, duration: 2.6, ease: 'power2.inOut' },
        2.8
      );

      if (stageRef.current) {
        tl.fromTo(
          stageRef.current,
          {
            clipPath: 'inset(34% 38% 34% 38% round 28px)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 8px)',
            opacity: 1,
            duration: 2.8,
            ease: 'power2.inOut',
          },
          2.5
        );
      }

      if (stageImgWrapRef.current) {
        tl.fromTo(
          stageImgWrapRef.current,
          { scale: 1.44 },
          { scale: 1, duration: 3.3, ease: 'power1.out' },
          2.5
        );
      }

      // Act III (5.3 -> 7.6): Lime Facts Strip + Animated Tabular Numbers + 2-Column Editorial Narrative
      if (factsRef.current) {
        tl.fromTo(
          factsRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25, ease: 'power3.out' },
          5.3
        );
      }

      if (factItems.length) {
        tl.fromTo(
          factItems,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.25, ease: 'power2.out' },
          5.7
        );
      }

      numEls.forEach((numEl, idx) => {
        const targetVal = Number(numEl.dataset.n || '0');
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: targetVal,
            duration: 1.35,
            ease: 'power1.out',
            onUpdate: () => {
              numEl.textContent = String(Math.round(counter.val));
            },
          },
          5.7 + idx * 0.25
        );
      });

      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { y: 64, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25, ease: 'power2.out' },
          5.45
        );
      }

      // Hold completed composition briefly before unpinning into DisciplineStack
      tl.to({}, { duration: 1.35 });

      ScrollTrigger.refresh();

      return () => {
        section.classList.remove('is-pinned-story');
        numEls.forEach((el) => {
          el.textContent = el.dataset.n ?? el.textContent;
        });
      };
    });

    // Responsive ScrollTrigger fallback for tablets & mobile
    mm.add('not all and (min-width: 1000px) and (min-height: 620px)', () => {
      section.classList.remove('is-pinned-story');
      const q = gsap.utils.selector(section);
      const words = q('[data-story-word]');

      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );

      if (stageImgWrapRef.current && stageRef.current) {
        gsap.fromTo(
          stageImgWrapRef.current,
          { scale: 1.24 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top bottom',
              end: 'bottom 35%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const activeStageLabel =
    scrollProgress < 36
      ? '01 · Vizyon'
      : scrollProgress < 72
      ? '02 · Sahne'
      : '03 · Miras';

  return (
    <section
      id="hikayemiz"
      ref={sectionRef}
      aria-labelledby="story-scroll-heading"
      className="story-scroll-root story-bg-glow relative text-[#111111] overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="story-scroll-pin max-w-[1400px] mx-auto px-5 lg:px-8 py-20 lg:py-26 grid gap-8 relative"
      >
        {/* Subtle ScrollTrigger Phase Rail on Desktop */}
        <div
          aria-hidden="true"
          className="story-scroll-rail hidden flex-col items-end gap-2 absolute right-2 xl:right-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none select-none"
        >
          <span className="font-mono text-[11px] font-medium text-[#111111]/60 tabular-nums">
            {activeStageLabel}
          </span>
          <div className="w-[3px] h-24 bg-[#111111]/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-[#111111] transition-all duration-75"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
          <span className="font-mono text-[11px] text-[#111111]/45 tabular-nums">
            %{scrollProgress}
          </span>
        </div>

        {/* Floating Portrait Left (Act I Drift) */}
        <div
          ref={floatLeftRef}
          aria-hidden="true"
          className="story-scroll-float hidden absolute left-4 xl:left-6 top-[44vh] w-[clamp(155px,14vw,235px)] aspect-[4/5] rounded-lg overflow-hidden shadow-[0_30px_60px_rgba(17,17,17,0.18)] z-10 pointer-events-none will-change-transform"
        >
          <SafeImage
            src={MEDIA_ASSETS.floatPointe}
            alt="Pointe tekniği bale silüeti"
            objectPosition="center 25%"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Portrait Right (Act I Drift) */}
        <div
          ref={floatRightRef}
          aria-hidden="true"
          className="story-scroll-float hidden absolute right-8 xl:right-12 top-[54vh] w-[clamp(145px,12.5vw,215px)] aspect-[4/5] rounded-lg overflow-hidden shadow-[0_30px_60px_rgba(17,17,17,0.18)] z-10 pointer-events-none will-change-transform"
        >
          <SafeImage
            src={MEDIA_ASSETS.socialHappy}
            alt="Konservatuvar sahne provası"
            objectPosition="center 30%"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 1: Word-Illuminated Headline */}
        <h2
          id="story-scroll-heading"
          ref={headlineRef}
          className="story-scroll-headline relative z-20 font-display font-extrabold tracking-[-0.03em] leading-[1.08] text-left lg:text-center lg:mx-auto max-w-[20ch] will-change-transform origin-center"
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
            textWrap: 'balance',
          }}
        >
          {HEADLINE_WORDS.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span data-story-word className="inline">
                {word}
              </span>
              {index < HEADLINE_WORDS.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h2>

        {/* Row 2: Clip-Path Expanding Panoramic Studio Stage */}
        <div
          ref={stageRef}
          className="story-scroll-stage relative z-10 aspect-[16/9] sm:aspect-[21/9] bg-[#F5F5F3] rounded-lg overflow-hidden shadow-[0_36px_72px_rgba(17,17,17,0.14)] will-change-transform"
        >
          <div
            ref={stageImgWrapRef}
            className="w-full h-full origin-[50%_60%] will-change-transform"
          >
            <SafeImage
              src={MEDIA_ASSETS.storyRehearsal}
              alt="Bissa Akademi gün ışığı alan ahşap zeminli bale ve müzik stüdyosu"
              objectPosition="center 48%"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 3: Signature Orange Facts Bar + Two-Column Editorial Details */}
        <div className="relative z-20 grid gap-5 lg:gap-6">
          <dl
            ref={factsRef}
            className="relative z-30 -mt-8 sm:-mt-12 mx-2 sm:mx-8 lg:mx-14 px-4 sm:px-6 py-4 sm:py-5 bg-[#FF6B00] text-white rounded-lg shadow-[0_24px_50px_rgba(224,86,0,0.3)] grid grid-cols-3 divide-x divide-white/25 will-change-transform"
          >
            <div data-story-fact className="px-2 sm:px-6 first:pl-2">
              <dt className="font-display font-black tracking-[-0.03em] text-lg sm:text-2xl lg:text-3xl leading-none whitespace-nowrap">
                <span data-story-num data-n="3" className="tabular-nums">
                  3
                </span>{' '}
                yaştan
              </dt>
              <dd className="mt-1.5 text-xs sm:text-sm font-semibold text-white/90">
                yetişkin sınıflarına
              </dd>
            </div>

            <div data-story-fact className="px-3 sm:px-6">
              <dt className="font-display font-black tracking-[-0.03em] text-lg sm:text-2xl lg:text-3xl leading-none whitespace-nowrap">
                <span data-story-num data-n="79" className="tabular-nums">
                  79
                </span>{' '}
                ülkede
              </dt>
              <dd className="mt-1.5 text-xs sm:text-sm font-semibold text-white/90">
                geçerli RAD sertifikası
              </dd>
            </div>

            <div data-story-fact className="px-3 sm:px-6 last:pr-2">
              <dt className="font-display font-black tracking-[-0.03em] text-lg sm:text-2xl lg:text-3xl leading-none whitespace-nowrap">
                <span data-story-num data-n="14" className="tabular-nums">
                  14
                </span>{' '}
                stüdyoda
              </dt>
              <dd className="mt-1.5 text-xs sm:text-sm font-semibold text-white/90">
                Güneşli Sınav Koleji kampüsü
              </dd>
            </div>
          </dl>

          <div
            ref={introRef}
            className="lg:mx-14 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start will-change-transform"
          >
            <p className="lg:col-span-5 font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-[-0.015em] leading-snug text-[#111111]">
              Amacımız öğrencilerimizin bedensel, zihinsel ve sosyal gelişimine kalıcı katkı
              sağlamak.
            </p>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed max-w-[64ch]">
                Bissa Akademi’nin Devlet Opera ve Balesi geleneğinden gelen sahne disipliniyle;
                Güneşli Sınav Koleji İstanbul yerleşkemizdeki modern stüdyolarımızda her yaştan
                öğrenciyi sanatla buluşturuyoruz.
              </p>

              <button
                type="button"
                onClick={onOpenHeritageModal}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#111111] font-display font-extrabold text-xs sm:text-sm text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-pointer group"
              >
                <span className="text-[#E05600] group-hover:text-[#FF6B00] text-base leading-none">
                  +
                </span>
                <span>Bizi daha yakından tanıyın</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
