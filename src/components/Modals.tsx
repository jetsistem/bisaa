import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, Award, MapPin } from 'lucide-react';
import {
  AcademyEvent,
  CAMPUSES,
  CampusInfo,
  CourseItem,
  MEDIA_ASSETS,
} from '../data/academyData';
import { SafeImage } from './SafeImage';
import { submitLeadToServer } from '../utils/submitLead';

interface CourseDrawerProps {
  course: CourseItem | null;
  onClose: () => void;
  onApplyCourse: (courseTitle: string) => void;
}

export const CourseDrawer: React.FC<CourseDrawerProps> = ({
  course,
  onClose,
  onApplyCourse,
}) => {
  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white text-[#111111] h-full overflow-y-auto shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="relative aspect-[16/9] bg-[#111111]">
            <SafeImage
              src={course.image}
              alt={course.title}
              objectPosition={course.photoPos || 'center 35%'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Pencereyi kapat"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs font-display font-bold tracking-wider text-[#FF6B00]">
                {course.discipline.toUpperCase()} BÖLÜMÜ · {course.ageRange}
              </p>
              <h2
                id="course-drawer-title"
                className="mt-1 font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
              >
                {course.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#E4E4E0] text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D95300] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#595959]">Ders Düzeni</p>
                  <p className="font-semibold text-[#111111]">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#D95300] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#595959]">Sertifika &amp; Akreditasyon</p>
                  <p className="font-semibold text-[#111111]">{course.accreditation}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-[#111111]">
                Program İçeriği
              </h3>
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
                {course.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-[#111111]">
                Kazanımlar ve Müfredat Vurguları
              </h3>
              <ul className="space-y-2.5">
                {course.highlights.map((hl, idx) => (
                  <li
                    key={idx}
                    className="flex items-baseline gap-3 text-sm text-[#111111]/90"
                  >
                    <span className="font-mono text-xs font-bold text-[#D95300] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 border-t border-[#E4E4E0] bg-[#F5F5F3] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#595959]">
            Güneşli Sınav Koleji kampüsümüzde tanışma dersi planlayın · 0552 219 54 34
          </div>
          <button
            type="button"
            onClick={() => {
              const title = course.title;
              onClose();
              onApplyCourse(title);
            }}
            className="px-7 py-3.5 rounded-full bg-[#FF6B00] text-white font-display font-extrabold text-xs sm:text-sm hover:bg-[#ff7d1f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bu Programa Başvur →
          </button>
        </div>
      </div>
    </div>
  );
};

interface EventModalProps {
  event: AcademyEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setRsvpDone(false);
    setError('');
    setGuestName('');
    setGuestPhone('');
  }, [event]);

  if (!event) return null;

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim().length < 2) {
      setError('Lütfen adınızı ve soyadınızı girin.');
      return;
    }
    if (guestPhone.replace(/\D/g, '').length < 10) {
      setError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    void submitLeadToServer({
      type: 'Etkinlik Katılım (RSVP)',
      name: guestName.trim(),
      phone: guestPhone.trim(),
      campus: event.campus,
      discipline: `${event.title} (${event.dateText})`,
    });
    setError('');
    setRsvpDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white text-[#111111] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/8] bg-[#111111]">
          <SafeImage
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs font-display font-bold text-[#FF6B00]">
              {event.category} · {event.dateText}
            </p>
            <h2 id="event-modal-title" className="mt-1 font-display font-bold text-xl">
              {event.title}
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#595959]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D95300]" />
              {event.campus}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D95300]" />
              {event.schedule}
            </span>
          </div>

          <p className="text-sm text-[#595959] leading-relaxed">{event.summary}</p>

          {rsvpDone ? (
            <div className="p-4 rounded-xl bg-[#F5F5F3] flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D95300] shrink-0" />
              <div className="text-xs">
                <p className="font-display font-bold text-[#111111]">
                  Katılım Talebiniz Kaydedildi
                </p>
                <p className="text-[#595959] mt-0.5">
                  Etkinlik davetiyesi ve kontenjan teyidi için ekibimiz sizinle iletişime
                  geçecektir.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRsvp} noValidate className="pt-3 border-t border-[#E4E4E0] space-y-3">
              <p className="font-display font-bold text-xs tracking-wide text-[#111111]">
                ETKİNLİK DAVETİYESİ &amp; BİLGİLENDİRME KAYDI
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  aria-label="Adınız Soyadınız"
                  className="h-10 px-3 rounded-lg border border-[#E4E4E0] text-sm focus:outline-none focus:border-[#FF6B00]"
                />
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="0552 219 54 34"
                  aria-label="Telefon numaranız"
                  className="h-10 px-3 rounded-lg border border-[#E4E4E0] text-sm tabular-nums focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#111111] text-white font-display font-bold text-xs tracking-wide hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
              >
                Katılım Kaydı Oluştur
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface HeritageModalProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const HeritageModal: React.FC<HeritageModalProps> = ({
  open,
  onClose,
  onApply,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="heritage-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white text-[#111111] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 bg-[#111111]">
          <SafeImage
            src={MEDIA_ASSETS.storyRehearsal}
            alt="Bissa Akademi tarihçesi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <p className="text-xs font-display font-bold tracking-wider text-[#FF6B00]">
              1998’DEN BUGÜNE · AKADEMİK SANAT MİRASI
            </p>
            <h2 id="heritage-modal-title" className="mt-1 font-display font-extrabold text-2xl">
              Bissa Akademi Hakkında
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 text-sm sm:text-base text-[#595959] leading-relaxed">
          <p className="text-[#111111] font-medium">
            Bissa Akademi, nitelikli sanat eğitimini her yaştan öğrenciyle buluşturma vizyonuyla
            Güneşli Sınav Koleji İstanbul yerleşkesindeki tam donanımlı stüdyolarında binlerce
            öğrenciye ev sahipliği yapmaktadır.
          </p>
          <p>
            Devlet Opera ve Balesi geleneğinden beslenen akademik müfredatımız; öğrencilerin
            anatomik gelişimini gözeten güvenli stüdyo mimarisini, konservatuvar kökenli eğitmen
            kadrosunu ve Londra merkezli Royal Academy of Dance (RAD) ile London College of Music
            (LCM) standartlarını bir araya getirir.
          </p>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#E4E4E0] text-center">
            <div>
              <p className="font-display font-black text-2xl text-[#111111] tabular-nums">27+</p>
              <p className="text-xs text-[#595959]">Yıllık Deneyim</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl text-[#111111] tabular-nums">79</p>
              <p className="text-xs text-[#595959]">Ülkede RAD Denkliği</p>
            </div>
            <div>
              <p className="font-display font-black text-2xl text-[#111111] tabular-nums">14</p>
              <p className="text-xs text-[#595959]">Sanat Stüdyosu</p>
            </div>
          </div>

          <div className="text-xs text-[#595959] space-y-1">
            <p className="font-semibold text-[#111111]">
              Adres: Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Güneşli, Bağcılar / İstanbul
            </p>
            <p className="font-mono font-bold text-[#D95300] tabular-nums">
              İletişim: 0552 219 54 34
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#E4E4E0] text-xs font-display font-bold text-[#111111] hover:bg-[#F5F5F3] cursor-pointer"
            >
              Kapat
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onApply();
              }}
              className="px-6 py-2.5 rounded-full bg-[#FF6B00] text-white text-xs font-display font-extrabold hover:bg-[#ff7d1f] cursor-pointer"
            >
              Tanışma Dersi Planla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickApplyModalProps {
  open: boolean;
  initialProgram?: string;
  initialCampus?: CampusInfo | null;
  onClose: () => void;
  onOpenKvkk?: () => void;
}

const MODAL_DISCIPLINE_OPTIONS = [
  'Bale (3 Yaş Mini – Teknik – Yetişkin)',
  'Dans (Street Jazz, Hip-Hop, Modern, Latin, Tango)',
  'Müzik (Piyano, Keman, Gitar, Vokal & LCM)',
  'Müzikal Tiyatro',
  'Yaratıcı Drama',
  'Konservatuvara Hazırlık',
];

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({
  open,
  initialProgram,
  initialCampus,
  onClose,
  onOpenKvkk,
}) => {
  const [campusName, setCampusName] = useState(CAMPUSES[0].name);
  const [program, setProgram] = useState(MODAL_DISCIPLINE_OPTIONS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ageGroup, setAgeGroup] = useState('4–6 Yaş Çocuk');
  const [kvkkAccepted, setKvkkAccepted] = useState(true);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (initialCampus) setCampusName(initialCampus.name);
    if (initialProgram && initialProgram !== 'Tanışma Dersi & Seviye Tespiti') {
      setProgram(initialProgram);
    } else {
      setProgram(MODAL_DISCIPLINE_OPTIONS[0]);
    }
    setDone(false);
    setError('');
  }, [open, initialProgram, initialCampus]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      setError('Lütfen öğrenci veya veli adını girin.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    if (!kvkkAccepted) {
      setError('Devam etmek için Aydınlatma Metni onay kutusunu işaretleyin.');
      return;
    }
    void submitLeadToServer({
      type: 'Tanışma Dersi (Popup)',
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || '-',
      campus: campusName,
      discipline: program,
      ageOrYear: ageGroup,
    });
    setError('');
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-apply-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[92svh] overflow-y-auto bg-[#161616] text-white border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-display font-bold tracking-wider text-[#FF6B00]">
              BİSSA AKADEMİ · GÜNEŞLİ SINAV KOLEJİ
            </p>
            <h2 id="quick-apply-title" className="font-display font-extrabold text-xl mt-0.5">
              Tanışma Dersi &amp; Seviye Tespiti
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {done ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-11 h-11 text-[#FF6B00] mx-auto" />
            <h3 className="font-display font-bold text-lg">Başvurunuz Kaydedildi</h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Sayın <strong className="text-white">{fullName}</strong>,{' '}
              <strong className="text-[#FF6B00]">{campusName}</strong> danışmanlarımız{' '}
              <strong>{program}</strong> tanışma dersi planlaması için en kısa sürede sizinle
              iletişime geçecektir.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#FF6B00] text-white font-display font-bold text-xs cursor-pointer"
            >
              Tamam
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            <div>
              <label className="block text-xs text-white/75 mb-1">Yerleşke / Birim Seçimi</label>
              <select
                value={campusName}
                onChange={(e) => setCampusName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              >
                {CAMPUSES.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#161616] text-white">
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/75 mb-1">İlgilendiğiniz Branş / Program</label>
              {MODAL_DISCIPLINE_OPTIONS.includes(program) ? (
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                >
                  {MODAL_DISCIPLINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#161616] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              )}
            </div>

            <div>
              <label className="block text-xs text-white/75 mb-1">Öğrenci / Veli Adı Soyadı</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Örn. Defne Yılmaz"
                className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/75 mb-1">Yaş Grubu</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="3 Yaş Mini" className="bg-[#161616]">3 Yaş Mini</option>
                  <option value="4–6 Yaş Çocuk" className="bg-[#161616]">4–6 Yaş Çocuk</option>
                  <option value="7–12 Yaş Okul Çağı" className="bg-[#161616]">7–12 Yaş</option>
                  <option value="13–17 Yaş Gençlik" className="bg-[#161616]">13–17 Yaş</option>
                  <option value="18+ Yetişkin" className="bg-[#161616]">18+ Yetişkin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/75 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0552 219 54 34"
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 tabular-nums focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/75 mb-1">E-Posta (İsteğe Bağlı)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-white/70 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(e) => setKvkkAccepted(e.target.checked)}
                className="mt-0.5 rounded accent-[#FF6B00]"
              />
              <span>
                Kişisel verilerimin işlenmesine ilişkin{' '}
                {onOpenKvkk ? (
                  <button
                    type="button"
                    onClick={onOpenKvkk}
                    className="underline text-[#FF6B00] hover:text-white cursor-pointer"
                  >
                    Aydınlatma Metni
                  </button>
                ) : (
                  <span className="text-[#FF6B00]">Aydınlatma Metni</span>
                )}
                ’ni okudum ve iletişim kurulmasını onaylıyorum.
              </span>
            </label>

            {error && <p role="alert" className="text-xs text-[#ff937a]">{error}</p>}

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[#FF6B00] text-white font-display font-extrabold text-sm hover:bg-[#ff7d1f] transition-colors cursor-pointer"
            >
              ÜCRETSİZ TANIŞMA DERSİ PLANLA
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const KvkkModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kvkk-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white text-[#111111] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="kvkk-title" className="font-display font-bold text-lg">
            6698 Sayılı KVKK Aydınlatma Metni
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="w-8 h-8 rounded-full bg-[#F5F5F3] flex items-center justify-center hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-[#595959] leading-relaxed">
          Bissa Akademi olarak ön kayıt ve tanışma dersi başvuru formları aracılığıyla
          paylaştığınız ad, soyad, doğum yılı, telefon ve e-posta verileriniz yalnızca eğitim
          danışmanlığı, seviye tespiti randevusu oluşturulması ve ilgili şube bilgilendirmeleri
          kapsamında 6698 sayılı Kişisel Verilerin Korunması Kanunu’na uygun olarak
          işlenmektedir.
        </p>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#111111] text-white font-display font-bold text-xs cursor-pointer"
          >
            Okudum, Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
