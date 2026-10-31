import heroBalletImg from '../assets/images/hero_ballet_stage_1793358003003.jpg';
import storyRehearsalImg from '../assets/images/story_academy_rehearsal_1793358004871.jpg';
import floatPointeImg from '../assets/images/float_classical_pointe_1793358006154.jpg';
import modernDanceImg from '../assets/images/discipline_modern_dance_1793358007216.jpg';
import musicPianoImg from '../assets/images/discipline_music_piano_1793358008874.jpg';
import socialHappyImg from '../assets/images/social_happy_stage_1793358009323.jpg';

export const MEDIA_ASSETS = {
  heroBallet: heroBalletImg,
  storyRehearsal: storyRehearsalImg,
  floatPointe: floatPointeImg,
  modernDance: modernDanceImg,
  musicPiano: musicPianoImg,
  socialHappy: socialHappyImg,
};

export interface CourseItem {
  id: string;
  title: string;
  ageRange: string;
  discipline: string;
  duration: string;
  accreditation: string;
  summary: string;
  highlights: string[];
  image: string;
  photoPos?: string;
}

export interface DisciplineGroup {
  groupTitle: string;
  items: CourseItem[];
}

export interface DisciplinePanelData {
  key: string;
  number: string;
  name: string;
  description: string;
  allLabel: string;
  image: string;
  photoPos: string;
  directCourses: CourseItem[];
  groups?: DisciplineGroup[];
}

export const HERO_SLIDES = [
  {
    id: 'ballet',
    image: heroBalletImg,
    pos: 'center 35%',
    caption: 'Klasik Bale & Royal Academy of Dance',
  },
  {
    id: 'dance',
    image: modernDanceImg,
    pos: 'center 30%',
    caption: 'Çağdaş Dans, Street Jazz & Sahne Koreografisi',
  },
  {
    id: 'music',
    image: musicPianoImg,
    pos: 'center 42%',
    caption: 'Enstrüman, Vokal & London College of Music',
  },
];

export const DISCIPLINE_PANELS: DisciplinePanelData[] = [
  {
    key: 'ballet',
    number: '01',
    name: 'Bale',
    description:
      '3 yaşında mini baleyle başlar, yaşa göre sınıflarla teknik baleye ilerler. Royal Academy of Dance sertifika programı ve konservatuvara hazırlık da burada; yetişkinlerin kendi sınıfı var.',
    allLabel: 'TÜM BALE KURSLARI',
    image: heroBalletImg,
    photoPos: 'center 32%',
    directCourses: [
      {
        id: 'mini-bale-3',
        title: '3 Yaş Mini Bale Kursu',
        ageRange: '3 Yaş',
        discipline: 'Bale',
        duration: 'Haftada 1 Gün · 50 Dakika',
        accreditation: 'Bissa Akademi Erken Sanat Pedagojisi',
        summary:
          'Oyun temelli ritim, duruş farkındalığı ve müzik kulağı egzersizleriyle çocukların sahne sanatlarıyla ilk tanışmasını güvenli ve neşeli bir stüdyo ortamında sağlar.',
        highlights: [
          'Esnek ahşap zeminli stüdyolarda temel koordinasyon ve denge',
          'Klasik müzik eşliğinde ritim ve alan algısı gelişimi',
          'Yaş grubuna özel pedagojik formasyonlu bale eğitmenleri',
        ],
        image: storyRehearsalImg,
        photoPos: 'center 40%',
      },
      {
        id: 'bale-hazirlik-4-6',
        title: '4-6 Yaş Bale Hazırlık Kursu',
        ageRange: '4–6 Yaş',
        discipline: 'Bale',
        duration: 'Haftada 1–2 Gün · 60 Dakika',
        accreditation: 'MEB & Pre-Primary RAD Uyumlu',
        summary:
          'Temel bale pozisyonları, zarafet, esneklik ve grup koreografisi disiplininin oyunsu yaratıcılıkla birleştiği hazırlık kademesidir.',
        highlights: [
          'Temel ayak ve kol pozisyonlarına anatomik giriş',
          'Yıl sonu sahne gösterisi deneyimi ve özgüven kazanımı',
          'Royal Academy of Dance Pre-Primary seviyesine geçiş altyapısı',
        ],
        image: heroBalletImg,
        photoPos: 'center 35%',
      },
      {
        id: 'teknik-bale-6-16',
        title: '6-16 Yaş Teknik Bale Kursu',
        ageRange: '6–16 Yaş',
        discipline: 'Bale',
        duration: 'Haftada 2 Gün · 75 Dakika',
        accreditation: 'MEB & RAD Grade 1–8',
        summary:
          'Akademik bar ve orta çalışmaları, pointe tekniğine geçiş, repertuvar çalışmaları ve uluslararası seviye sınavlarıyla bütünsel klasik bale eğitimi.',
        highlights: [
          '8 yıllık kademeli MEB onaylı müfredat ve diploma hakkı',
          'Bar, adagio, allegro ve pointe hazırlık çalışmaları',
          'Ulusal ve uluslararası sahne temsillerinde yer alma imkanı',
        ],
        image: storyRehearsalImg,
        photoPos: 'center 45%',
      },
      {
        id: 'konservatuvar-bale',
        title: 'Konservatuvara Hazırlık Bale Kursu',
        ageRange: '10–18 Yaş',
        discipline: 'Bale',
        duration: 'Birebir & Grup Yoğun Program',
        accreditation: 'Devlet Konservatuvarları Sınav Müfredatı',
        summary:
          'Devlet Opera ve Balesi baş dansçılığı geleneğinden gelen akademik kadro eşliğinde yetenek sınavlarına teknik, müzikal ve artistik hazırlık.',
        highlights: [
          'Anatomik uygunluk analizi ve bireysel esneklik/kuvvet planı',
          'Klasik varyasyon koçluğu ve solfej-ritim sınav simülasyonları',
          'Yurt içi ve yurt dışı konservatuvar seçmelerine portfolyo hazırlığı',
        ],
        image: floatPointeImg,
        photoPos: 'center 30%',
      },
      {
        id: 'rad-sertifika',
        title: 'Royal Academy of Dance Sertifika Programı',
        ageRange: '5+ Yaş',
        discipline: 'Bale',
        duration: 'Uluslararası Sınav Takvimi',
        accreditation: '79 Ülkede Geçerli RAD Sertifikası',
        summary:
          'Merkezi Londra’da bulunan Royal Academy of Dance müfettişlerinin katılımıyla gerçekleşen sınavlar sonucunda 79 ülkede tanınan uluslararası akreditasyon.',
        highlights: [
          'Londra merkezli resmi RAD sınav merkezi ayrıcalığı',
          'Uluslararası üniversite başvurularında geçerli UCAS puan katkısı',
          'Her seviye sonunda resmi değerlendirme karnesi ve sertifika',
        ],
        image: heroBalletImg,
        photoPos: 'center 30%',
      },
      {
        id: 'yetiskin-bale',
        title: 'Yetişkin Bale Kursu',
        ageRange: '18+ Yaş',
        discipline: 'Bale',
        duration: 'Haftada 1–2 Gün · Akşam & Hafta Sonu',
        accreditation: 'Bissa Akademi Yetişkin Atölye Sertifikası',
        summary:
          'Daha önce hiç bale yapmamış veya çocukluk tutkusuna geri dönmek isteyen yetişkinler için postür, esneklik ve klasik bale estetiği sınıfları.',
        highlights: [
          'Başlangıç ve orta seviye ayrıştırılmış yetişkin sınıfları',
          'Omurga sağlığı, duruş düzeltme ve zarif kas kondisyonu',
          'Piyano eşlikli bar ve merkez kombinasyonları',
        ],
        image: floatPointeImg,
        photoPos: 'center 35%',
      },
    ],
  },
  {
    key: 'dance',
    number: '02',
    name: 'Dans',
    description:
      '5 yaşından itibaren hip-hop ve street jazz, 13 yaşından sonra jazz dans. Yetişkinler için modern dans, Latin dans, tango ve sirtaki.',
    allLabel: 'TÜM DANS KURSLARI',
    image: modernDanceImg,
    photoPos: 'center 30%',
    directCourses: [
      {
        id: 'mini-hiphop',
        title: '5-6 Yaş Mini Hip-Hop Kursu',
        ageRange: '5–6 Yaş',
        discipline: 'Dans',
        duration: 'Haftada 1 Gün · 60 Dakika',
        accreditation: 'Bissa Akademi Sahne Sanatları Programı',
        summary:
          'Yüksek enerjili ritimler eşliğinde çocukların motor becerilerini, özgüvenini ve grup içi uyumunu geliştiren dinamik başlangıç programı.',
        highlights: [
          'Yaşa uygun dinamik müziklerle temel groove ve izolasyon',
          'Oyunlaştırılmış koreografi hafızası egzersizleri',
          'Dönem sonu sahne performansı',
        ],
        image: modernDanceImg,
        photoPos: 'center 35%',
      },
      {
        id: 'hip-hop',
        title: 'Hip-Hop Kursu',
        ageRange: '7–17 Yaş & Yetişkin',
        discipline: 'Dans',
        duration: 'Haftada 1–2 Gün · 75 Dakika',
        accreditation: 'Bissa Akademi Dans Bölümü Sertifikası',
        summary:
          'Old-school temellerinden güncel urban koreografilere uzanan ritim, freestyle ve sahne enerjisi odaklı kapsamlı dans eğitimi.',
        highlights: [
          'Popping, locking, bounce ve güncel koreografi teknikleri',
          'Müzikalite ve doğaçlama (freestyle) çember çalışmaları',
          'Yarışma ve festival topluluklarına seçilme olanağı',
        ],
        image: modernDanceImg,
        photoPos: 'center 28%',
      },
      {
        id: 'modern-dans',
        title: 'Modern Dans Kursu',
        ageRange: '13+ Yaş & Yetişkin',
        discipline: 'Dans',
        duration: 'Haftada 2 Gün · 75 Dakika',
        accreditation: 'MEB & Çağdaş Dans Programı',
        summary:
          'Graham, Limon ve çağdaş yer tekniği (floorwork) prensipleriyle bedenin doğal ağırlığını, nefesini ve anlatım gücünü keşfedin.',
        highlights: [
          'Akıcı yer çalışmaları, nefes-hareket koordinasyonu ve doğaçlama',
          'Çağdaş koreografi üretimi ve sahne kompozisyonu',
          'Esneklik ve merkez bölge (core) kuvvetlendirme',
        ],
        image: modernDanceImg,
        photoPos: 'center 30%',
      },
      {
        id: 'latin-dans',
        title: 'Latin Dans Kursu',
        ageRange: 'Yetişkin',
        discipline: 'Dans',
        duration: 'Haftada 1 Gün · 90 Dakika',
        accreditation: 'Sosyal & Performans Latin Programı',
        summary:
          'Salsa, Bachata ve Cha-Cha ritimleriyle hem bireysel hem eşli dans tekniğini keyifli bir sosyal atmosferde öğrenin.',
        highlights: [
          'Partner uyumu (lead & follow) ve temel ayak oyunları',
          'Düzenli pratik geceleri ve atölye buluşmaları',
          'Eşli veya bireysel katılım imkanı',
        ],
        image: modernDanceImg,
        photoPos: 'center 40%',
      },
      {
        id: 'tango-kursu',
        title: 'Tango Kursu',
        ageRange: 'Yetişkin',
        discipline: 'Dans',
        duration: 'Haftada 1 Gün · 90 Dakika',
        accreditation: 'Arjantin Tango Atölyesi',
        summary:
          'Arjantin tangosunun zarif yürüyüşü, duruşu, müzikal yorumu ve milonga kültürünü uzman eğitmenlerle deneyimleyin.',
        highlights: [
          'Abrazo (tutuş), eksen kontrolü ve ocho/giro teknikleri',
          'Klasik ve nuevo tango orkestralarını müzikal okuma',
          'Milonga pratik saatleri ile pekiştirme',
        ],
        image: floatPointeImg,
        photoPos: 'center 40%',
      },
      {
        id: 'sirtaki-kursu',
        title: 'Sirtaki Kursu',
        ageRange: 'Yetişkin',
        discipline: 'Dans',
        duration: 'Haftada 1 Gün · 75 Dakika',
        accreditation: 'Ege Dansları Atölyesi',
        summary:
          'Hasapiko’dan Zeybekiko’ya Ege’nin sıcak ritimlerini, kolektif adım dizilerini ve kültürünü paylaşan enerjik yetişkin sınıfı.',
        highlights: [
          'Geleneksel Hasapiko, Hasaposerviko ve solo adımlar',
          'Ritim duygusu ve grup senkronizasyonu',
          'Sosyal etkinlikler ve sahne dinletileri',
        ],
        image: socialHappyImg,
        photoPos: 'center 35%',
      },
    ],
    groups: [
      {
        groupTitle: 'Jazz Dans & Street Jazz',
        items: [
          {
            id: 'street-jazz-7-8',
            title: '7-8 Yaş Street Jazz Kursu',
            ageRange: '7–8 Yaş',
            discipline: 'Dans',
            duration: 'Haftada 1–2 Gün · 60 Dakika',
            accreditation: 'Bissa Akademi Jazz Dans Müfredatı',
            summary:
              'Jazz dansın teknik disiplinini güncel popüler ritimlerle birleştiren, esneklik ve sahne duruşu kazandıran çocuk programı.',
            highlights: ['Jazz yürüyüşleri, pirouette hazırlığı ve dinamik kombinasyonlar', 'Esneklik ve ritmik senkronizasyon', 'Yıl sonu sahne şovu'],
            image: modernDanceImg,
          },
          {
            id: 'street-jazz-9-12',
            title: '9-12 Yaş Street Jazz Kursu',
            ageRange: '9–12 Yaş',
            discipline: 'Dans',
            duration: 'Haftada 2 Gün · 75 Dakika',
            accreditation: 'Bissa Akademi Jazz Dans Müfredatı',
            summary:
              'Sıçrama teknikleri, dönüşler ve yüksek tempolu grup koreografileriyle genç dansçıların sahne hakimiyetini güçlendirir.',
            highlights: ['Teknik ısınma, izolasyon ve köşe (diagonal) çalışmaları', 'Sahne enerjisi ve ifade çalışmaları', 'Akademi gösteri gruplarına geçiş imkanı'],
            image: modernDanceImg,
          },
          {
            id: 'jazz-13-plus',
            title: '13 Yaş ve Üzeri Jazz Dans Kursu',
            ageRange: '13–17 Yaş',
            discipline: 'Dans',
            duration: 'Haftada 2 Gün · 75 Dakika',
            accreditation: 'Bissa Akademi İleri Jazz Programı',
            summary:
              'Broadway jazz, lyrical jazz ve commercial koreografi stillerini harmanlayan gençlik performans sınıfı.',
            highlights: ['Çok yönlü koreografi adaptasyonu', 'Kuvvet, esneklik ve müzikal vurgu çalışmaları', 'Müzikal ve sahne projeleriyle entegre pratik'],
            image: modernDanceImg,
          },
          {
            id: 'yetiskin-jazz',
            title: 'Yetişkin Jazz Dans Kursu',
            ageRange: '18+ Yaş',
            discipline: 'Dans',
            duration: 'Haftada 1–2 Gün · Akşam',
            accreditation: 'Bissa Akademi Yetişkin Dans Sertifikası',
            summary:
              'Günün temposundan uzaklaşırken kardiyo, esneklik ve estetik koreografiyi bir arada sunan enerjik yetişkin programı.',
            highlights: ['Her seviyeye uygun kademeli teknik akış', 'Ritim, duruş ve dinamik sahne koreografileri', 'Keyifli stüdyo atmosferi'],
            image: modernDanceImg,
          },
        ],
      },
    ],
  },
  {
    key: 'music',
    number: '03',
    name: 'Müzik',
    description:
      'Piyanodan bateriye on bir branşta enstrüman, Türk müziği ve şan/vokal eğitimi. MEB ve London College of Music programları, konservatuvar ve güzel sanatlar lisesine hazırlık.',
    allLabel: 'TÜM MÜZİK KURSLARI',
    image: musicPianoImg,
    photoPos: 'center 42%',
    directCourses: [
      {
        id: 'opera-san-vokal',
        title: 'Opera Şan / Pop Vokal Kursu',
        ageRange: '8+ Yaş & Yetişkin',
        discipline: 'Müzik',
        duration: 'Haftada 1 Gün · Birebir 50 Dakika',
        accreditation: 'LCM & MEB Vokal Programı',
        summary:
          'Diyafram nefesi, ses sağlığı, entonasyon, rezonans ve sahne yorumculuğu üzerine birebir uzman eğitmen eşliğinde vokal eğitimi.',
        highlights: [
          'Ses aralığı analizi ve sağlıklı diyafram tekniği',
          'Klasik aryalar, müzikal tiyatro veya çağdaş pop/caz repertuvarı',
          'Piyano eşlikli resital ve sahne mikrofon pratiği',
        ],
        image: musicPianoImg,
      },
      {
        id: 'konservatuvar-muzik',
        title: 'Konservatuvar ve Güzel Sanatlar Lisesine Hazırlık',
        ageRange: '11–19 Yaş',
        discipline: 'Müzik',
        duration: 'Yoğun Birebir Enstrüman + Solfej',
        accreditation: 'Akademik Sınav Hazırlık Programı',
        summary:
          'İşitme, dikte, deşifre, müzik teorisi ve enstrüman/şan repertuvarını kapsayan bütünsel yetenek sınavı hazırlık programı.',
        highlights: [
          'Tek ses, çift ses, akor duyuş ve ritmik hafıza simülasyonları',
          'Sınav jürisi formatında deneme dinletileri',
          'Konservatuvar akademisyenlerinden birebir mentorluk',
        ],
        image: musicPianoImg,
      },
      {
        id: 'lcm-meb-muzik',
        title: 'MEB ve London College of Music',
        ageRange: '6+ Yaş & Yetişkin',
        discipline: 'Müzik',
        duration: 'Uluslararası & Resmi Müfredat',
        accreditation: 'University of West London (LCM) & MEB',
        summary:
          'Akademimiz resmi LCM eğitim ve sınav merkezidir. Öğrencilerimiz uluslararası geçerli lise/üniversite denklik sertifikaları alabilir.',
        highlights: [
          'Step 1’den Diploma (DipLCM) seviyesine kadar tüm kademeler',
          'Dünya çapında tanınan akredite müzik sertifikası',
          'Yılda iki dönem resmi sınav takvimi',
        ],
        image: musicPianoImg,
      },
    ],
    groups: [
      {
        groupTitle: 'Enstrüman Eğitimleri (Birebir)',
        items: [
          {
            id: 'piyano',
            title: 'Piyano Kursu',
            ageRange: '4+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Ders + Solfej',
            accreditation: 'LCM & MEB Onaylı',
            summary: 'Akustik piyanolarla klasik ve çağdaş repertuvar, nota okuma ve müzik teorisi eğitimi.',
            highlights: ['Akustik piyanolu yalıtımlı stüdyolar', 'Yıllık Piyano Festivali resitalleri', 'LCM Grade 1–8 sınav hazırlığı'],
            image: musicPianoImg,
          },
          {
            id: 'keman',
            title: 'Keman Kursu',
            ageRange: '5+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Ders + Oda Müziği',
            accreditation: 'LCM & MEB Onaylı',
            summary: 'Doğru yay tutuşu, entonasyon ve orkestra/oda müziği disipliniyle birebir keman eğitimi.',
            highlights: ['Yaşa uygun keman boyutu danışmanlığı', 'Yay tekniği ve müzikal ifade', 'Akademi oda orkestrası dinletileri'],
            image: musicPianoImg,
          },
          {
            id: 'viyolonsel',
            title: 'Viyolonsel (Çello) & Viyola Kursu',
            ageRange: '6+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Ders + Topluluk',
            accreditation: 'LCM & MEB Onaylı',
            summary: 'Yaylı sazların derin ve sıcak tınısını konservatuvar mezunu sanatçılarla birebir keşfedin.',
            highlights: ['Anatomik oturuş ve yay hakimiyeti', 'Oda müziği düet ve trio çalışmaları', 'Uluslararası sertifika hazırlığı'],
            image: socialHappyImg,
          },
          {
            id: 'gitar-ukulele',
            title: 'Gitar & Ukulele Kursu',
            ageRange: '5+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Ders · 50 Dakika',
            accreditation: 'LCM Klasik / Akustik / Elektro',
            summary: 'Klasik, akustik, elektro gitar ve küçük yaş grupları için ukulele branşlarında birebir eğitim.',
            highlights: ['Nota, tab ve akor eşlik teknikleri', 'Klasik ve modern repertuvar', 'Grup performans atölyeleri'],
            image: musicPianoImg,
          },
          {
            id: 'nefesli-sazlar',
            title: 'Flüt, Saksafon & Klarnet Kursu',
            ageRange: '7+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Ders · 50 Dakika',
            accreditation: 'LCM & MEB Onaylı',
            summary: 'Diyafram kontrolü, ambuşür tekniği ve klasik/caz repertuvarıyla nefesli enstrüman eğitimi.',
            highlights: ['Doğru nefes ve ton üretimi', 'Klasik, caz ve film müzikleri repertuvarı', 'Sahne eşlikli dinletiler'],
            image: musicPianoImg,
          },
          {
            id: 'bateri-turk-muzigi',
            title: 'Bateri / Perküsyon & Türk Müziği',
            ageRange: '6+ Yaş & Yetişkin',
            discipline: 'Müzik',
            duration: 'Birebir Stüdyo Dersi',
            accreditation: 'LCM Rockschool & Geleneksel Müfredat',
            summary: 'Akustik bateri stüdyolarında ritim koordinasyonu ve geleneksel Türk müziği makam/icra dersleri.',
            highlights: ['Poliritmik koordinasyon ve baget tekniği', 'Band gruplarıyla canlı prova deneyimi', 'Makam ve usul zenginliği'],
            image: musicPianoImg,
          },
        ],
      },
    ],
  },
];

export const PAIR_DISCIPLINES: CourseItem[] = [
  {
    id: 'muzikal-tiyatro',
    title: 'Müzikal Tiyatro',
    ageRange: '7–17 Yaş & Yetişkin',
    discipline: 'Sahne Sanatları',
    duration: 'Haftada 1 Gün · 120 Dakika Atölye',
    accreditation: 'Bissa Akademi Sahne Sanatları Sertifikası',
    summary:
      'Şan, dans ve oyunculuğu tek bir sahne disiplininde buluşturan; Broadway ve dünya müzikallerinden sahnelerle yürütülen çok yönlü performans eğitimi.',
    highlights: [
      'Vokal projeksiyon, koro harmonisi ve şarkı içinde oyunculuk',
      'Karakter analizi ve müzikal koreografi entegrasyonu',
      'Yıl sonu kostümlü ve ışıklı büyük sahne prodüksiyonu',
    ],
    image: modernDanceImg,
    photoPos: 'center 30%',
  },
  {
    id: 'yaratici-drama',
    title: 'Yaratıcı Drama',
    ageRange: '4–14 Yaş',
    discipline: 'Sahne Sanatları',
    duration: 'Haftada 1 Gün · 60–75 Dakika',
    accreditation: 'Bissa Akademi Pedagojik Drama Programı',
    summary:
      'Doğaçlama, rol oynama ve hikaye kurgulama yoluyla empati, topluluk önünde kendini ifade etme ve yaratıcı düşünme becerilerini geliştirir.',
    highlights: [
      'Empati, aktif dinleme ve sözel ifade akıcılığı',
      'Yaş gruplarına göre ayrılmış güvenli çember atölyeleri',
      'Hayal gücü ve takım çalışması odaklı dramatik kurgular',
    ],
    image: socialHappyImg,
    photoPos: 'center 35%',
  },
];

export interface CertificateProgram {
  no: string;
  code: string;
  title: string;
  shortDesc: string;
  details: string;
  metrics: string;
}

export const CERTIFICATE_PROGRAMS: CertificateProgram[] = [
  {
    no: '01',
    code: 'RAD',
    title: 'Royal Academy of Dance (RAD)',
    shortDesc:
      'Bale programımız 2019–2020 döneminden beri kendi müfredatımızla birlikte Londra merkezli RAD sertifika programıyla yürütülüyor.',
    details:
      'İngiltere Kraliyet Dans Akademisi’nden gelen resmi denetmenler eşliğinde yapılan sınavlarda başarılı olan öğrencilerimiz, 79 ülkede geçerli uluslararası sertifika ve yurt dışı üniversite başvurularında UCAS puan avantajı elde eder.',
    metrics: '79 Ülkede Akreditasyon · Pre-Primary – Grade 8',
  },
  {
    no: '02',
    code: 'LCM',
    title: 'London College of Music (LCM)',
    shortDesc:
      'Akademimiz resmi LCM eğitim ve sınav merkezidir. Müzik öğrencileri uluslararası geçerliliğe sahip seviye ve diploma sınavlarına katılır.',
    details:
      '1887’de kurulan ve University of West London bünyesinde faaliyet gösteren LCM sınavları; piyano, yaylılar, gitar, nefesliler ve vokal branşlarında uluslararası konservatuvar ve lise denkliği sağlar.',
    metrics: 'Resmi Sınav Merkezi · Step 1 – DipLCM',
  },
  {
    no: '03',
    code: 'MEB',
    title: 'Milli Eğitim Bakanlığı Onaylı Programlar',
    shortDesc:
      'Tüm okullarımız T.C. Milli Eğitim Bakanlığı Özel Öğretim Kurumları standartlarında ruhsatlı ve müfredat onaylı eğitim verir.',
    details:
      'Sekiz yıllık teknik bale ve müzik kademelerini başarıyla tamamlayan öğrencilerimiz, resmi MEB onaylı kurs bitirme belgesi ile eğitmenlik ve akademik kariyer basamaklarında resmi yeterlilik kazanır.',
    metrics: '8 Yıllık Kademeli Müfredat · Resmi Diploma',
  },
];

export interface AcademyEvent {
  id: string;
  day: string;
  month: string;
  dateText: string;
  category: 'DUYURU' | 'GÖSTERİ' | 'WORKSHOP' | 'GEZİ & AÇIK DERS';
  campus: string;
  title: string;
  summary: string;
  schedule: string;
  image: string;
}

export const ACADEMY_EVENTS: AcademyEvent[] = [
  {
    id: 'gunesli-baslangic',
    day: '26',
    month: 'EYL',
    dateText: '26 Eylül 2026',
    category: 'DUYURU',
    campus: 'Güneşli Sınav Koleji Kampüsü',
    title: 'Güneşli Kampüsümüzde Kültür ve Sanata Renkli Başlangıç',
    summary:
      'Güneşli Sınav Koleji yerleşkemizdeki modern stüdyolarımızda yeni eğitim dönemimizi açık stüdyo provaları, oda müziği dinletileri ve tanışma dersleriyle karşılıyoruz.',
    schedule: 'Cumartesi · 11:00 – 17:30 · Ana Sahne & Stüdyolar',
    image: storyRehearsalImg,
  },
  {
    id: 'yeni-donem-kayit',
    day: '01',
    month: 'EYL',
    dateText: '1 Eylül 2026',
    category: 'DUYURU',
    campus: 'Güneşli Sınav Koleji · İstanbul',
    title: 'Yeni Eğitim Dönemi Kayıtları ve Seviye Tespit Günleri',
    summary:
      'Bale, dans, müzik, müzikal tiyatro ve yaratıcı drama bölümlerimizde 3 yaştan yetişkinlere tüm yaş grupları için yeni dönem kayıtlarımız başladı.',
    schedule: 'Hafta İçi & Hafta Sonu · 09:30 – 19:30',
    image: heroBalletImg,
  },
  {
    id: 'swans-genc-bale',
    day: '10',
    month: 'EKI',
    dateText: '10 Ekim 2026',
    category: 'GÖSTERİ',
    campus: 'Güneşli Sınav Koleji Konferans & Sahne Salonu',
    title: 'Bissa Akademi Genç Bale Topluluğu “SWANS”',
    summary:
      'Akademimizin ileri seviye teknik bale öğrencilerinden oluşan Genç Bale Topluluğu, klasik repertuvar seçkisi ve çağdaş neoklasik koreografilerle sahnede.',
    schedule: 'Cumartesi · 20:00 · Büyük Tiyatro Salonu',
    image: floatPointeImg,
  },
  {
    id: 'klasik-bale-workshop',
    day: '24',
    month: 'EKI',
    dateText: '24 Ekim 2026',
    category: 'WORKSHOP',
    campus: 'Güneşli Sınav Koleji · Bale Stüdyoları',
    title: 'Baş Dansçılar İle Klasik Bale ve Repertuvar Atölyesi',
    summary:
      'Devlet Opera ve Balesi solist sanatçıları eşliğinde 9–17 yaş teknik bale öğrencilerine özel dönüş, allegro ve sahne yorumu masterclass çalışması.',
    schedule: 'Cumartesi · 14:00 – 16:30 · Kontenjan Sınırlı',
    image: heroBalletImg,
  },
  {
    id: 'latin-atolyesi',
    day: '07',
    month: 'KAS',
    dateText: '7 Kasım 2026',
    category: 'WORKSHOP',
    campus: 'Güneşli Sınav Koleji · Dans Stüdyosu A',
    title: 'Yetişkinler İçin Latin Dansları ve Tango Ritim Atölyesi',
    summary:
      'Dansa ilk adımı atmak isteyen yetişkinler için müzikalite, duruş ve temel eşli kombinasyonları içeren hafta sonu deneyim atölyesi.',
    schedule: 'Cumartesi · 18:00 – 20:00 · Stüdyo A',
    image: modernDanceImg,
  },
  {
    id: 'piyano-festivali',
    day: '21',
    month: 'KAS',
    dateText: '21 Kasım 2026',
    category: 'GÖSTERİ',
    campus: 'Güneşli Sınav Koleji · Resital Salonu',
    title: 'Bissa Akademi Geleneksel Piyano ve Oda Müziği Festivali',
    summary:
      'Müzik bölümü öğrencilerimizin solo piyano, keman, çello ve oda müziği performanslarıyla sahne heyecanını paylaştığı geleneksel konser serisi.',
    schedule: 'Cumartesi – Pazar · 13:00 / 16:00 / 19:00 Seansları',
    image: musicPianoImg,
  },
  {
    id: 'acik-dersler',
    day: '05',
    month: 'ARA',
    dateText: '5 Aralık 2026',
    category: 'GEZİ & AÇIK DERS',
    campus: 'Güneşli Sınav Koleji · İstanbul',
    title: 'Veli Katılımlı Açık Ders Haftası ve Kültür Sanat Buluşması',
    summary:
      'Velilerimiz sınıf içi ders akışını yakından izlerken eğitmenlerimizle öğrencilerimizin dönem içi gelişimini değerlendiriyor.',
    schedule: '5–12 Aralık Haftası · Ders Programı Saatlerinde',
    image: socialHappyImg,
  },
];

export interface CampusInfo {
  id: string;
  city: 'İstanbul';
  name: string;
  district: string;
  address: string;
  phone: string;
  studios: string;
  programs: string[];
}

export const CAMPUSES: CampusInfo[] = [
  {
    id: 'gunesli-merkez',
    city: 'İstanbul',
    name: 'Güneşli Sınav Koleji Kampüsü',
    district: 'Güneşli, Bağcılar / İstanbul',
    address: 'Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Güneşli, Bağcılar / İstanbul',
    phone: '0552 219 54 34',
    studios: '6 Bale & Dans Stüdyosu · 8 Akustik Müzik Odası · Ana Tiyatro Sahnesi',
    programs: ['Bale (RAD)', 'Dans', 'Müzik (LCM)', 'Müzikal Tiyatro', 'Yaratıcı Drama'],
  },
  {
    id: 'gunesli-bale-sahne',
    city: 'İstanbul',
    name: 'Güneşli Bale & Sahne Sanatları Yerleşkesi',
    district: 'Güneşli, Bağcılar / İstanbul',
    address: 'Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Güneşli, Bağcılar / İstanbul',
    phone: '0552 219 54 34',
    studios: 'Esnek Ahşap Zeminli Bale Salonları · Kulis & Kostüm Atölyesi',
    programs: ['3 Yaş Mini Bale', 'Teknik Bale (RAD)', 'Konservatuvara Hazırlık', 'Yetişkin Bale'],
  },
  {
    id: 'gunesli-muzik-konservatuvar',
    city: 'İstanbul',
    name: 'Güneşli Müzik & LCM Sınav Merkezi',
    district: 'Güneşli, Bağcılar / İstanbul',
    address: 'Güneşli Sınav Koleji — Bağlar Mah. Atatürk Cad. No: 72, Güneşli, Bağcılar / İstanbul',
    phone: '0552 219 54 34',
    studios: 'Akustik Yalıtımlı Birebir Enstrüman Odaları · Cep Resital Salonu',
    programs: ['Piyano', 'Keman & Çello', 'Gitar & Bateri', 'Şan / Vokal (LCM)'],
  },
];

export interface ParentReview {
  id: string;
  parentName: string;
  role: string;
  campus: string;
  quote: string;
  outcome: string;
}

export const PARENT_REVIEWS: ParentReview[] = [
  {
    id: 'rev-1',
    parentName: 'Selin Aksoy Demir',
    role: '6-16 Yaş Teknik Bale Öğrenci Velisi',
    campus: 'Güneşli Sınav Koleji Kampüsü · 4. Yıl',
    quote:
      'Kızım 4 yaşında çekingen bir çocuk olarak girdiği kapıdan bugün Royal Academy of Dance Grade 2 sınavına özgüvenle hazırlanan, duruşu ve disipliniyle hayranlık uyandıran bir genç bale öğrencisi olarak çıkıyor.',
    outcome: 'RAD Grade 2 Başarı Sertifikası & Yıl Sonu Solist Performansı',
  },
  {
    id: 'rev-2',
    parentName: 'Murat & Zeynep Karahan',
    role: 'Piyano ve Keman Bölümü Velisi',
    campus: 'Güneşli Sınav Koleji Kampüsü · 3. Yıl',
    quote:
      'İki çocuğumuz da aynı çatı altında hem LCM piyano müfredatını takip ediyor hem de kampüs sahnesinde gerçek bir konser atmosferinde çalmanın heyecanını yaşıyor. Eğitmenlerin pedagojik yaklaşımı olağanüstü.',
    outcome: 'LCM Step 2 & Grade 3 Üstün Başarı Derecesi',
  },
  {
    id: 'rev-3',
    parentName: 'Deniz Erkmen',
    role: 'Yetişkin Bale & Tango Katılımcısı',
    campus: 'Güneşli Sınav Koleji Kampüsü · 2. Yıl',
    quote:
      'Otuzlu yaşlarımda sıfırdan baleye başlamak gözümü korkutuyordu. İlk dersten itibaren anatomik doğrulukla ve sıcak bir disiplinle çalıştık; hem omurga duruşum değişti hem de haftanın en mutlu saatlerini burada geçiriyorum.',
    outcome: 'Yetişkin Bale 2. Seviye & Dönem Sonu Sahne Gösterisi',
  },
  {
    id: 'rev-4',
    parentName: 'Dr. Elif Çetin Soylu',
    role: 'Street Jazz & Müzikal Tiyatro Velisi',
    campus: 'Güneşli Sınav Koleji Kampüsü · 3. Yıl',
    quote:
      'Oğlumun bitmek bilmeyen enerjisini hem ritim hem sahne ifadesine dönüştürdüler. Müzikal tiyatro dersleri sayesinde topluluk önünde konuşma ve takım içi sorumluluk bilinci gözle görülür biçimde gelişti.',
    outcome: 'Gençlik Müzikal Topluluğu Başrol Kadrosu',
  },
];
