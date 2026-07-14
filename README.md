# تدرّج - رحلة العلم والعمل | Tadruj - Journey of Knowledge and Action

<div align="center">

📚 **منصة تعليمية إسلامية شاملة**  
**Comprehensive Islamic Education Platform**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Extracted-success)](())

</div>

---

## 📖 عن المشروع | About

**تدرّج** هي منصة تعليمية إسلامية شاملة تقدم محاضرات في العقيدة والفقه والحديث والتزكية والسير، مقسمة على ثلاثة مستويات علمية.

**Tadruj** is a comprehensive Islamic education platform offering lectures in Aqeedah, Fiqh, Hadith, Tazkiyah, and Seerah, organized into three scholarly levels.

---

## ✨ المميزات | Features

| العربية | English |
|---------|---------|
| 📚 **٢٠ كتاب** في العلوم الشرعية | 📚 **20 books** in Islamic sciences |
| 🎓 **١,٢٤٥ محاضرة** منظمة | 🎓 **1,245 organized lectures** |
| 🌱 **٣ مستويات** علمية | 🌱 **3 scholarly levels** |
| 📝 **اختبارات** تفاعلية | 📝 **Interactive quizzes** |
| 🔥 **تتبع التقدم** والأهداف | 🔥 **Progress tracking** & goals |
| 💎 **حسنات** وإنجازات | 💎 **Rewards** & achievements |
| ☁️ **يعمل محلياً** - لا يحتاج سيرفر | ☁️ **Works offline** - no server needed |

---

## 🎯 المستويات | Levels

### 🌱 المستوى التمهيدي | Introductory Level
- الأصول الثلاثة (10 محاضرات)
- أصول الإيمان (27 محاضرة)
- عمدة الفقه (45 محاضرة)
- الأربعون النووية (16 محاضرة)
- أسماء الله الحسنى (29 محاضرة)
- حلية طالب العلم (12 محاضرة)
- الناجون من عصر التفاهة (7 محاضرات)

**المجموع**: ١٤٧ محاضرة | **Total**: 147 lectures

### 📖 المستوى التأهيلي | Qualifying Level
- كتاب التوحيد (56 محاضرة)
- الفقه الميسر (12 محاضرة)
- رياض الصالحين (4 محاضرات)
- السيرة النبوية (4 محاضرات)
- صور من حياة الصحابة (4 محاضرات)
- صور من حياة التابعين (4 محاضرات)

**المجموع**: ٣٨٧ محاضرة | **Total**: 387 lectures

### 🎓 المستوى المتقدم | Advanced Level
- العقيدة الواسطية (4 محاضرات)
- العقيدة الطحاوية (4 محاضرات)
- منار السبيل (4 محاضرات)
- مختصر صحيح البخاري (4 محاضرات)
- الداء والدواء (4 محاضرات)
- مدارج السالكين (4 محاضرات)
- سير أعلام النبلاء (3 محاضرات)

**المجموع**: ٧١١ محاضرة | **Total**: 711 lectures

---

## 🏗️ هيكل المشروع | Project Structure

```
tadruj-reversed/
├── 📁 src/
│   ├── 📁 components/      # React components
│   ├── 📁 data/
│   │   └── books.js        # بيانات الكتب والمحاضرات
│   ├── 📁 hooks/
│   │   └── useTadarruj.js  # Custom React hooks
│   ├── App.jsx             # Main application
│   ├── main.jsx            # Entry point
│   └── index.css           # Styles
├── 📁 public/
│   └── favicon.svg         # App icon
├── 📁 docs/
│   ├── LECTURES_LIST.md    # Full lectures list
│   └── DATA_EXTRACTION_REPORT.md
├── 📁 source/
│   └── books_section_raw.js
├── 📁 data/
│   └── components_structure.json
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## 🚀 التشغيل | Running

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 التقنيات | Technologies

| Technology | Purpose |
|------------|---------|
| ⚛️ React 18 | UI framework |
| 🎨 Vite | Build tool |
| 🌬️ Tailwind CSS | Styling |
| 🔄 React Router | Navigation |
| 💾 localStorage | Data persistence |

---

## 🔐 الأمان | Security

✅ **تم التحقق**: لا يوجد API keys أو database URLs أو أي بيانات حساسة

✅ **Verified**: No API keys, database URLs, or sensitive data

---

## 📊 الإحصائيات | Statistics

| Metric | Value |
|--------|-------|
| 📦 Bundle Size | 582 KB |
| ⚛️ Components | 339 |
| 🎣 Hooks | 115 |
| 📝 Functions | 1,523 |
| 📖 Books | 20 |
| 🎥 Lectures | 1,245 |

---

## 📝 الملاحظات | Notes

### اكتشافات مهمة | Important Discoveries

1. **الأسئلة تُولد ديناميكياً**: Quiz questions are generated dynamically from book content using the `Al()` function
2. **يعمل محلياً 100%**: App works 100% client-side with localStorage
3. **لا يوجد Backend**: No backend or external APIs required

---

## 📜 الترخيص | License

MIT License - Free for educational purposes

---

## 🤝 المساهمة | Contributing

هذا المشروع للاستخدام التعليمي فقط | This project is for educational use only

---

<div align="center">

**بسم الله الرحمن الرحيم**

Made with ❤️ for seeking knowledge

</div>
