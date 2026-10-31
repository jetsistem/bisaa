/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AcademyEvent, CampusInfo, CourseItem } from './data/academyData';
import { SiteHeader } from './components/SiteHeader';
import { CinemaHero } from './components/CinemaHero';
import { StoryScroll } from './components/StoryScroll';
import { DisciplineStack } from './components/DisciplineStack';
import { CertificatesSection } from './components/CertificatesSection';
import { EventsSection } from './components/EventsSection';
import { SocialMottoSection } from './components/SocialMottoSection';
import { CampusesAndReviews } from './components/CampusesAndReviews';
import { FooterCta } from './components/FooterCta';
import {
  CourseDrawer,
  EventModal,
  HeritageModal,
  KvkkModal,
  QuickApplyModal,
} from './components/Modals';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<AcademyEvent | null>(null);
  const [heritageOpen, setHeritageOpen] = useState(false);
  const [kvkkOpen, setKvkkOpen] = useState(false);

  const [quickApplyOpen, setQuickApplyOpen] = useState(false);
  const [quickApplyProgram, setQuickApplyProgram] = useState<string | undefined>(
    undefined
  );
  const [quickApplyCampus, setQuickApplyCampus] = useState<CampusInfo | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenQuickApply = (programName?: string, campus?: CampusInfo | null) => {
    setQuickApplyProgram(programName);
    setQuickApplyCampus(campus ?? null);
    setQuickApplyOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111]">
      <SiteHeader onOpenQuickApply={(disc) => handleOpenQuickApply(disc, null)} />

      <main>
        {/* 1. Cinema Hero with GSAP Word Rise, Stage Slider, Scroll Parallax & Pre-Registration Form */}
        <CinemaHero
          onOpenKvkk={() => setKvkkOpen(true)}
          onOpenQuickApply={() => handleOpenQuickApply('Tanışma Dersi & Seviye Tespiti', null)}
          selectedDisciplineExternal={quickApplyProgram}
        />

        {/* 2. Signature 360vh Pinned StoryScroll GSAP ScrollTrigger Section */}
        <StoryScroll onOpenHeritageModal={() => setHeritageOpen(true)} />

        {/* 3. Sticky Layered DisciplineStack (01 Bale, 02 Dans, 03 Müzik, 04 Müzikal & Drama) */}
        <DisciplineStack
          onSelectCourse={(course) => setSelectedCourse(course)}
          onApplyDiscipline={(name) => handleOpenQuickApply(`${name} Bölümü`, null)}
        />

        {/* 4. Clip-Path Scrubbed International Accreditations (RAD / LCM / MEB) */}
        <CertificatesSection
          onApplyWithAccreditation={(title) => handleOpenQuickApply(title, null)}
        />

        {/* 5. Horizontal GSAP Scrubbed Events & Announcements */}
        <EventsSection onSelectEvent={(ev) => setSelectedEvent(ev)} />

        {/* 6. "EN MUTLU OLDUĞUM YER" Motto Showcase with ClipPath, Word Stagger & Tilted Parallax */}
        <SocialMottoSection
          onExploreCampuses={() => {
            document.querySelector('#okullarimiz')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Interactive 11-Campus Explorer + GSAP Scrubbed Parent Testimonials */}
        <CampusesAndReviews
          onApplyCampus={(campus) =>
            handleOpenQuickApply(`${campus.name} — Tanışma Dersi`, campus)
          }
        />

        {/* 8. Clip-Path Expanding CTA + Rising Oversized Wordmark Footer */}
        <FooterCta
          onOpenQuickApply={() => handleOpenQuickApply(undefined, null)}
          onOpenKvkk={() => setKvkkOpen(true)}
        />
      </main>

      {/* Interactive Drawers & Modals */}
      <CourseDrawer
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onApplyCourse={(courseTitle) => handleOpenQuickApply(courseTitle, null)}
      />

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      <HeritageModal
        open={heritageOpen}
        onClose={() => setHeritageOpen(false)}
        onApply={() => handleOpenQuickApply('Tanışma Dersi & Seviye Tespiti', null)}
      />

      <QuickApplyModal
        open={quickApplyOpen}
        initialProgram={quickApplyProgram}
        initialCampus={quickApplyCampus}
        onClose={() => setQuickApplyOpen(false)}
        onOpenKvkk={() => setKvkkOpen(true)}
      />

      <KvkkModal open={kvkkOpen} onClose={() => setKvkkOpen(false)} />
    </div>
  );
}

