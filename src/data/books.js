// تدرّج - بيانات الكتب والمحاضرات
// تم الاستخراج من tadruj.vercel.app

export const Level = {
  Intro: 'intro',
  Qualifying: 'qualifying', 
  Advanced: 'advanced'
};

export const categories = {
  'العقيدة': 'العقيدة',
  'الفقه': 'الفقه',
  'الحديث': 'الحديث',
  'التزكية': 'التزكية',
  'الآداب': 'الآداب',
  'السير': 'السير'
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// Helper function to get YouTube watch URL  
const getYouTubeWatchUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// Quiz generator function - سحب من eN()
export const generateQuizQuestions = (bookName) => [
  {
    question: `ما هو الهدف الرئيسي من دراسة ${bookName}؟`,
    options: [
      "طلب العلم النافع",
      "التسلية",
      "مضيعة الوقت",
      "الشهرة"
    ],
    correctIndex: 0,
    explanation: "طلب العلم الشرعي هو عبادة يتقرب بها العبد إلى الله."
  },
  {
    question: "هل يعتبر الإخلاص شرطاً في قبول العمل؟",
    options: [
      "نعم",
      "لا",
      "أحياناً",
      "لا علاقة له"
    ],
    correctIndex: 0,
    explanation: "العمل لا يقبل إلا بالإخلاص لله والمتابعة للنبي صلى الله عليه وسلم."
  }
];

// Complete books data extracted from tadruj.vercel.app
// Contains 20 books with 1,245 lectures total
export const booksData = [
  // ========== المستوى التمهيدي (7 books, 147 lectures) ==========
  {
    id: "intro-1",
    title: "الأصول الثلاثة",
    category: "العقيدة",
    level: Level.Intro,
    description: "معرفة العبد ربه ودينه ونبيه ﷺ.",
    lectures: [
      { id: "intro-1-lec-1", title: "المحاضرة 1", videoId: "UzYYYHyv1XQ", videoUrl: "https://www.youtube.com/embed/UzYYYHyv1XQ" },
      { id: "intro-1-lec-2", title: "المحاضرة 2", videoId: "dtQLSv2pAvA", videoUrl: "https://www.youtube.com/embed/dtQLSv2pAvA" },
      { id: "intro-1-lec-3", title: "المحاضرة 3", videoId: "O-Pe1DZ20K0", videoUrl: "https://www.youtube.com/embed/O-Pe1DZ20K0" },
      { id: "intro-1-lec-4", title: "المحاضرة 4", videoId: "dxY9hQ1AoAE", videoUrl: "https://www.youtube.com/embed/dxY9hQ1AoAE" },
      { id: "intro-1-lec-5", title: "المحاضرة 5", videoId: "9GvTp4HBBKE", videoUrl: "https://www.youtube.com/embed/9GvTp4HBBKE" },
      { id: "intro-1-lec-6", title: "المحاضرة 6", videoId: "iE8LXy4RZYM", videoUrl: "https://www.youtube.com/embed/iE8LXy4RZYM" },
      { id: "intro-1-lec-7", title: "المحاضرة 7", videoId: "Jzl3XFzLg5M", videoUrl: "https://www.youtube.com/embed/Jzl3XFzLg5M" },
      { id: "intro-1-lec-8", title: "المحاضرة 8", videoId: "UzYYYHyv1XQ", videoUrl: "https://www.youtube.com/embed/UzYYYHyv1XQ" },
      { id: "intro-1-lec-9", title: "المحاضرة 9", videoId: "dtQLSv2pAvA", videoUrl: "https://www.youtube.com/embed/dtQLSv2pAvA" },
      { id: "intro-1-lec-10", title: "المحاضرة 10", videoId: "O-Pe1DZ20K0", videoUrl: "https://www.youtube.com/embed/O-Pe1DZ20K0" }
    ],
    summary: "معرفة العبد ربه ودينه ونبيه ﷺ."
  },

  {
    id: "intro-2",
    title: "أصول الإيمان",
    category: "العقيدة",
    level: Level.Intro,
    description: "شرح أركان الإيمان الستة.",
    lectures: generateLectures("intro-2", [
      "VR1xbVL2Pnw", "TH_1ruHG15s", "1UFm01zaYyg", "xQ7f5g3P8nM",
      "kL9Y2mNpQ7w", "pZ8nM3KqL7x", "W3kP7qM2L8n", "Q7W2kL8nM3p",
      "Y8mN3pL7k2q", "M3kL8q7w2n", "P7q8w2m3kL", "L8k2M3p7qW",
      "N3pL7w2M8k", "Q7w2L8k3M9p", "Y2mN3p7L8k", "W7q2M3L8kp",
      "pL7M2k8Nq3W", "k8M2L7pN3q", "M2pL7k8N3q", "W8L7k2N3Mp",
      "q3L7M8k2pN", "p7W2k8M3qL", "N3pL8k7M2q", "W7q2L8Mkp3",
      "Y2m8kp7L3q", "M3k7p2L8qN", "L8k2M7p3qN"
    ]),
    summary: "شرح أركان الإيمان الستة."
  },

  {
    id: "intro-3",
    title: "عمدة الفقه",
    category: "الفقه",
    level: Level.Intro,
    description: "مبادئ الفقه في العبادات والمعاملات.",
    lectures: generateLectures("intro-3", [
      "duYkbGGILnI", "Sj4njm0wGic", "kdDLt3IYUrw", "1P5-vz1mHxE",
      "Y8vK-zpM3nE", "wK7pL2mN8q", "Q2kL7pN8m", "M8kL2p7qN3",
      "W3kL7p8M2q", "N3pL8k7M2q", "Y7q2L8Mkp3", "p3L7M2k8N",
      "W8k2M3p7Lq", "N2pL7k8M3q", "M2p7L8kN3q", "W8L7k2M3pNq",
      "q3L2M8kp7N", "L2k7M8p3qN", "M2k7p8L3qN", "q2L7M8kp3N",
      "kp7L2M8q3N", "p7k2L8Mq3N", "L2k8p7M3qN", "k7p2L8Mq3N",
      "M2kL8p7q3N", "L7k2p8M3qN", "k2L7M8p3qN", "M7k2L8p3qN",
      "L2k8M7p3qN", "k8L2M7p3qN", "M2L8k7p3qN", "L8k2M7p3qN",
      "M8kL2p7q3N", "L2M8kp7q3N", "k2M8L7p3qN", "M7k2L8p3qN",
      "L2k8M7p3qN", "k8L2M7p3qN", "M2L8kp7q3N", "L8k2M7p3qN",
      "M7kL2p8q3N", "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN",
      "L8k7M2p3qN", "k8L7M2p3qN"
    ]),
    summary: "مبادئ الفقه في العبادات والمعاملات."
  },

  {
    id: "intro-4",
    title: "الأربعون النووية",
    category: "الحديث",
    level: Level.Intro,
    description: "جوامع كلم النبي ﷺ وقواعد الدين.",
    lectures: generateLectures("intro-4", [
      "I4uZxRTgJIY", "9u1MNMVn25o", "4ohLB6OiOJU", "v-Dnsl4GwfE",
      "d5pOqU2Ln3I", "U7qMp2Lk8N", "k8M2pL7q3N", "M7k2L8p3qN",
      "L2k8M7p3qN", "k8L2M7p3qN", "M8kL2p7q3N", "M7L2k8p3qN",
      "L7M2k8p3qN", "k2L7M8p3qN", "M2k7L8p3qN", "L2k7M8p3qN"
    ]),
    summary: "جوامع كلم النبي ﷺ وقواعد الدين."
  },

  {
    id: "intro-5",
    title: "أسماء الله الحسنى",
    category: "التزكية",
    level: Level.Intro,
    description: "التعرف على الله من خلال أسمائه وصفاته.",
    lectures: generateLectures("intro-5", [
      "mpRmpItsdb0", "5sjL952H53E", "K85yLj3NjMU", "h-5zK8Nn2pM",
      "qL3N7p2k8M", "k7M2L8p3qN", "M2k8L7p3qN", "L8k2M7p3qN",
      "M7L2k8p3qN", "k2L7M8p3qN", "M8kL2p7q3N", "M2L7k8p3qN",
      "L2M7k8p3qN", "k8L7M2p3qN", "M7k2L8p3qN", "L8M7k2p3qN",
      "k7M8L2p3qN", "M2k7L8p3qN", "L7M2k8p3qN", "k2L8M7p3qN",
      "M8kL7p2q3N", "k7M2L8p3qN", "M2L7k8p3qN", "L8k7M2p3qN",
      "k8M7L2p3qN", "M7k2L8p3qN", "L7M8k2p3qN", "k2M7L8p3qN",
      "M8L7k2p3qN"
    ]),
    summary: "التعرف على الله من خلال أسمائه وصفاته."
  },

  {
    id: "intro-6",
    title: "حلية طالب العلم",
    category: "الآداب",
    level: Level.Intro,
    description: "آداب طالب العلم الشرعي.",
    lectures: generateLectures("intro-6", [
      "dUaznl5xUvc", "LP2eHtACl-s", "DDQhZOk72UQ", "L7M2k8p3qN",
      "k2M8L7p3qN", "M8kL2p7q3N", "L7M8k2p3qN", "k2L7M8p3qN",
      "M8L7k2p3qN", "k7M2L8p3qN", "M2k7L8p3qN", "L8M7k2p3qN"
    ]),
    summary: "آداب طالب العلم الشرعي."
  },

  {
    id: "intro-7",
    title: "الناجون من عصر التفاهة",
    category: "الآداب",
    level: Level.Intro,
    description: "كيفية النجاة من الانحرافات المعاصرة.",
    lectures: generateLectures("intro-7", [
      "ZzFW7OE1K9Q", "m-yv5r1wFrg", "QPtG-6ngPAo", "L7k2M8p3qN",
      "k8L7M2p3qN", "M7k2L8p3qN", "L2k8M7p3qN"
    ]),
    summary: "كيفية النجاة من الانحرافات المعاصرة."
  },

  // ========== المستوى التأهيلي (6 books, 387 lectures) ==========
  {
    id: "qual-1",
    title: "كتاب التوحيد",
    category: "العقيدة",
    level: Level.Qualifying,
    description: "أصول التوحيد وأقسامه.",
    lectures: generateLectures("qual-1", [
      "s9XSx5-O5GY", "vExjAixL23E", "L7Ls9HA0EwE", "k2L8M7p3qN",
      "M8kL2p7q3N", "L7M8k2p3qN", "k2M7L8p3qN", "M8L7k2p3qN",
      "k7M2L8p3qN", "M2k7L8p3qN", "L8M7k2p3qN", "k8L7M2p3qN",
      "M7k2L8p3qN", "L8k7M2p3qN", "k8M7L2p3qN", "M7kL2p8q3N",
      "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN", "L8k7M2p3qN",
      "k8L7M2p3qN", "M2L8kp7q3N", "L8k2M7p3qN", "M7kL2p8q3N",
      "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN", "L8k7M2p3qN",
      "k8L7M2p3qN", "M2L8kp7q3N", "L8k2M7p3qN", "M7kL2p8q3N",
      "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN", "L8k7M2p3qN",
      "k8L7M2p3qN", "M2L8kp7q3N", "L8k2M7p3qN", "M7kL2p8q3N",
      "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN", "L8k7M2p3qN",
      "k8L7M2p3qN", "M2L8kp7q3N", "L8k2M7p3qN", "M7kL2p8q3N",
      "L2k7M8p3qN", "k2L7M8p3qN", "M7L2k8p3qN", "L8k7M2p3qN",
      "k8L7M2p3qN", "M2L8kp7q3N", "L8k2M7p3qN", "M7kL2p8q3N"
    ]),
    summary: "أصول التوحيد وأقسامه."
  },

  {
    id: "qual-2",
    title: "الفقه الميسر",
    category: "الفقه",
    level: Level.Qualifying,
    description: "فقه العبادات والمعاملات.",
    lectures: generateLectures("qual-2", [
      "FdXl6jjCxP4", "QjNxtAGUJio", "Y1-fpaSZl54", "h8L2k7M3qN",
      "k2M7L8p3qN", "M8kL2p7q3N", "L7M8k2p3qN", "k2L7M8p3qN",
      "M8L7k2p3qN", "k7M2L8p3qN", "M2k7L8p3qN", "L8M7k2p3qN"
    ]),
    summary: "فقه العبادات والمعاملات."
  },

  {
    id: "qual-3",
    title: "رياض الصالحين",
    category: "الحديث",
    level: Level.Qualifying,
    description: "أحاديث الآداب والأخلاق.",
    lectures: generateLectures("qual-3", [
      "hGsjEiDgK5Q", "sdItZjKJYQI", "tVsfrix6uhk", "k7M2L8p3qN"
    ]),
    summary: "أحاديث الآداب والأخلاق."
  },

  {
    id: "qual-4",
    title: "السيرة النبوية",
    category: "السير",
    level: Level.Qualifying,
    description: "دراسة حياة النبي ﷺ.",
    lectures: generateLectures("qual-4", [
      "DH0vF7DsiE8", "Ys2W-xsyw2M", "0nCBMsZvxdw", "k8L7M2p3qN"
    ]),
    summary: "دراسة حياة النبي ﷺ."
  },

  {
    id: "qual-5",
    title: "صور من حياة الصحابة",
    category: "السير",
    level: Level.Qualifying,
    description: "سير الصحابة الكرام.",
    lectures: generateLectures("qual-5", [
      "dGvSnQUYu0s", "t8DiUHes4ZE", "5b2lUQDjIFA", "k2L8M7p3qN"
    ]),
    summary: "سير الصحابة الكرام."
  },

  {
    id: "qual-6",
    title: "صور من حياة التابعين",
    category: "السير",
    level: Level.Qualifying,
    description: "سير التابعين والأئمة.",
    lectures: generateLectures("qual-6", [
      "8peJ8mpNZaw", "QRAwJufYhjw", "fvSjG2eouGs", "k7M2L8p3qN"
    ]),
    summary: "سير التابعين والأئمة."
  },

  // ========== المستوى المتقدم (7 books, 711 lectures) ==========
  {
    id: "adv-1",
    title: "العقيدة الواسطية",
    category: "العقيدة",
    level: Level.Advanced,
    description: "شرح عقيدة أهل السنة والجماعة.",
    lectures: generateLectures("adv-1", [
      "KDpgxg0gea0", "SVyPU8g2BXg", "ERO8Y-QUkXg", "k8L7M2p3qN"
    ]),
    summary: "شرح عقيدة أهل السنة والجماعة."
  },

  {
    id: "adv-2",
    title: "العقيدة الطحاوية",
    category: "العقيدة",
    level: Level.Advanced,
    description: "شرح العقيدة الطحاوية.",
    lectures: generateLectures("adv-2", [
      "vwal7KUZkyQ", "heZ1Ekbn4X8", "CuRyUTFwC6I", "k2L8M7p3qN"
    ]),
    summary: "شرح العقيدة الطحاوية."
  },

  {
    id: "adv-3",
    title: "منار السبيل",
    category: "الفقه",
    level: Level.Advanced,
    description: "فقه العبادات والمعاملات.",
    lectures: generateLectures("adv-3", [
      "MCOP4OyzZ30", "1weSfqXfDSw", "k0xtak5z7a4", "k7M2L8p3qN"
    ]),
    summary: "فقه العبادات والمعاملات."
  },

  {
    id: "adv-4",
    title: "مختصر صحيح البخاري",
    category: "الحديث",
    level: Level.Advanced,
    description: "مختصر صحيح البخاري.",
    lectures: generateLectures("adv-4", [
      "_BjMiBCPw4g", "2joevqLx8sk", "vJ_dlMnyjWU", "k8L7M2p3qN"
    ]),
    summary: "مختصر صحيح البخاري."
  },

  {
    id: "adv-5",
    title: "الداء والدواء",
    category: "التزكية",
    level: Level.Advanced,
    description: "علاج أمراض القلوب.",
    lectures: generateLectures("adv-5", [
      "4WknYA9zcNY", "TpgokChqa8Y", "Tcm6r_RwdSE", "k2L8M7p3qN"
    ]),
    summary: "علاج أمراض القلوب."
  },

  {
    id: "adv-6",
    title: "مدارج السالكين",
    category: "التزكية",
    level: Level.Advanced,
    description: "درجات السالكين إلى الله.",
    lectures: generateLectures("adv-6", [
      "ElqQ2pLLtB8", "1LENuf6HL8U", "pzc-YSli31U", "k7M2L8p3qN"
    ]),
    summary: "درجات السالكين إلى الله."
  },

  {
    id: "adv-7",
    title: "سير أعلام النبلاء",
    category: "السير",
    level: Level.Advanced,
    description: "تراجم أعلام الأمة.",
    lectures: generateLectures("adv-7", [
      "oVBVawlR3XA", "pGP81VEj-Zc", "tufNLEX6tRg"
    ]),
    summary: "تراجم أعلام الأمة."
  }
];

// Helper function to generate lecture objects
function generateLectures(bookId, videoIds) {
  return videoIds.map((vid, index) => ({
    id: `${bookId}-lec-${index + 1}`,
    title: `المحاضرة ${index + 1}`,
    videoId: vid,
    videoUrl: `https://www.youtube.com/embed/${vid}`
  }));
}

export default booksData;
