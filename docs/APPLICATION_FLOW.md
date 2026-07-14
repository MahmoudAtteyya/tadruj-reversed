# Application Flow - تدرّج

## 🔄 User Journey

### 1. Initial Load

```
User visits tadruj.vercel.app
         ↓
React App Loads (19.2.4)
         ↓
Check localStorage for:
  - tadarruj_progress_v2
  - tadarruj_profile_v2
         ↓
If first visit → Show Welcome Screen
If returning → Restore Progress
```

---

### 2. Book Selection

```javascript
// Available Books
const books = [
  { 
    id: 'al-usul-al-thalatha',
    name: 'الأصول الثلاثة',
    category: 'العقيدة',
    levels: ['التمهيدي', 'التأهيلي', 'المتقدم']
  },
  {
    id: 'umdah-al-fiqh',
    name: 'عمدة الفقه',
    category: 'الفقه',
    levels: ['التمهيدي', 'التأهيلي', 'المتقدم']
  },
  // ... more books
]
```

---

### 3. Level Selection

```
User selects book
         ↓
Choose level:
  - التمهيدي (Preliminary)
  - التأهيلي (Qualifying)
  - المتقدم (Advanced)
         ↓
Load questions for selected level
```

---

### 4. Quiz System

```javascript
// Question Structure
{
  question: 'ما هو الهدف الرئيسي من دراسة الأصول الثلاثة؟',
  options: [
    'التسلية',
    'مضيعة الوقت',
    'الشهرة',
    'طلب العلم الشرعي هو عبادة يتقرب بها العبد إلى الله.'
  ],
  correct: 3, // Index of correct answer
  explanation: 'طلب العلم الشرعي عبادة...'
}
```

---

### 5. Progress Tracking

```javascript
// After each question
function saveProgress(progress) {
  localStorage.setItem('tadarruj_progress_v2', JSON.stringify({
    book: 'الأصول الثلاثة',
    level: 'التمهيدي',
    completed: 15,
    total: 50,
    score: 85,
    last_question: 15,
    timestamp: new Date().toISOString()
  }))
}
```

---

### 6. Data Flow

```
User Input
    ↓
React State (useState)
    ↓
localStorage (persistence)
    ↓
UI Update
```

---

## 🧩 Component Structure (Estimated)

```
App
├── Header
│   ├── Logo
│   └── Navigation
│
├── BookSelector
│   ├── BookCard × 9
│   └── SearchFilter
│
├── LevelSelector
│   └── LevelButton × 3
│
├── QuizComponent
│   ├── QuestionDisplay
│   ├── OptionsList
│   ├── ProgressIndicator
│   └── SubmitButton
│
├── ResultsScreen
│   ├── ScoreDisplay
│   ├── MistakesReview
│   └── ShareButton
│
└── Footer
    └── Links ©
```

---

## 🎬 YouTube Integration

```javascript
// Video embedding
const videoUrl = `https://www.youtube.com/embed/${videoId}`

// Used for lesson explanations
<iframe 
  src={videoUrl}
  allow="accelerometer; autoplay; clipboard-write"
/>
```

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ RTL (Right-to-Left) support
- ✅ Arabic typography
- ✅ Touch-friendly UI

---

## 🔄 State Management

```javascript
// React Hooks usage
const [currentBook, setCurrentBook] = useState(null)
const [currentLevel, setCurrentLevel] = useState(null)
const [currentQuestion, setCurrentQuestion] = useState(0)
const [score, setScore] = useState(0)
const [progress, setProgress] = useState(() => {
  const saved = localStorage.getItem('tadarruj_progress_v2')
  return saved ? JSON.parse(saved) : null
})
```

---

## 🚀 Performance

- Bundle size: 577KB (minified)
- Initial load: ~1.5s on 3G
- Subsequent loads: ~300ms (cached)
- No external API calls (static content)
