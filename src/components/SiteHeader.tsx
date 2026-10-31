import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SiteHeaderProps {
  onOpenQuickApply: (defaultDiscipline?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Hikayemiz', href: '#hikayemiz' },
  { label: 'Branşlar', href: '#branslar' },
  { label: 'Sertifikalar', href: '#sertifikalar' },
  { label: 'Etkinlikler', href: '#etkinlikler' },
  { label: 'Okullarımız', href: '#okullarimiz' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onOpenQuickApply }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#111111]/95 backdrop-blur-md border-b border-white/10 text-white'
            : 'bg-gradient-to-b from-black/70 to-transparent text-white'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-16 lg:h-20 px-5 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B00]"
          >
            BİSSA AKADEMİ
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Ana menü"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/85"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-white transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FF6B00] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B00]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuickApply()}
              className="px-5 py-2.5 text-xs sm:text-sm font-display font-bold tracking-wide bg-[#FF6B00] text-white rounded-full hover:bg-[#ff7d1f] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B00]"
            >
              Bize Katıl
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              className="lg:hidden p-2.5 text-white hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#111111] text-white pt-20 px-6 pb-8 flex flex-col justify-between lg:hidden">
          <nav aria-label="Mobil menü" className="flex flex-col divide-y divide-white/10">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="py-4 flex items-center justify-between font-display text-2xl font-bold tracking-tight hover:text-[#FF6B00] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-sm font-mono text-white/40 tabular-nums">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="space-y-1 text-sm text-white/75">
              <p>Güneşli Sınav Koleji — Bağcılar / İstanbul</p>
              <a
                href="tel:05522195434"
                className="inline-block font-mono font-bold text-[#FF6B00] tabular-nums"
              >
                0552 219 54 34
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenQuickApply();
              }}
              className="w-full py-3.5 px-6 bg-[#FF6B00] text-white font-display font-extrabold text-sm rounded-full hover:bg-[#ff7d1f] transition-colors cursor-pointer"
            >
              Ön Kayıt &amp; Tanışma Dersi Planla
            </button>
          </div>
        </div>
      )}
    </>
  );
};
