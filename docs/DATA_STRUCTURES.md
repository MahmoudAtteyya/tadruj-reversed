# Data Structures - تدرّج

## 📊 LocalStorage Schema

### 1. Progress Data (`tadarruj_progress_v2`)

```javascript
{
  "book": {
    "id": "al-usul-al-thalatha",
    "name": "الأصول الثلاثة",
    "category": "العقيدة"
  },
  
  "level": "التمهيدي", // التمهيدي | التأهيلي | المتقدم
  
  "progress": {
    "completed_questions": [1, 2, 3, 4, 5],
    "correct_answers": [1, 3, 5],
    "wrong_answers": [2, 4],
    "current_streak": 2,
    "best_streak": 5
  },
  
  "score": {
    "current": 85,
    "total": 100,
    "percentage": 85.0
  },
  
  "timing": {
    "started_at": "2026-07-14T08:00:00Z",
    "last_updated": "2026-07-14T09:30:00Z",
    "total_time_spent": 3600 // seconds
  }
}
```

---

### 2. Profile Data (`tadarruj_profile_v2`)

```javascript
{
  "name": "أحمد محمد",
  
  "preferences": {
    "theme": "light", // light | dark
    "language": "ar",
    "notifications": true,
    "auto_play_videos": false
  },
  
  "achievements": [
    {
      "id": "first_lesson",
      "name": "الدرس الأول",
      "unlocked_at": "2026-07-14T08:15:00Z"
    }
  ],
  
  "statistics": {
    "total_books_started": 3,
    "total_levels_completed": 1,
    "total_questions_answered": 45,
    "overall_accuracy": 82.5
  }
}
```

---

### 3. Help Acknowledgment (`tadarruj_help_ack`)

```javascript
{
  "acknowledged": true,
  "timestamp": "2026-07-14T08:00:00Z"
}
```

---

## 📚 Books Collection

```javascript
const books = [
  {
    id: 'al-usul-al-thalatha',
    name: 'الأصول الثلاثة',
    category: 'العقيدة',
    description: 'معرفة العبد ربه ودينه ونبيه ﷺ',
    total_questions: {
      'التمهيدي': 30,
      'التأهيلي': 50,
      'المتقدم': 70
    }
  },
  
  {
    id: 'umdah-al-fiqh',
    name: 'عمدة الفقه',
    category: 'الفقه',
    description: 'مبادئ الفقه في العبادات والمعاملات',
    total_questions: {
      'التمهيدي': 40,
      'التأهيلي': 60,
      'المتقدم': 80
    }
  },
  
  {
    id: 'al-arbain-al-nawawiyyah',
    name: 'الأربعون النووية',
    category: 'الحديث',
    description: 'جوامع كلم النبي ﷺ وقواعد الدين',
    total_questions: {
      'التمهيدي': 40,
      'التأهيلي': 60,
      'المتقدم': 80
    }
  },
  
  {
    id: 'asmaullah-al-husna',
    name: 'أسماء الله الحسنى',
    category: 'التزكية',
    description: 'التعرف على الله من خلال أسمائه وصفاته',
    total_questions: {
      'التمهيدي': 99,
      'التأهيلي': 99,
      'المتقدم': 99
    }
  },
  
  {
    id: 'hilyat-talib-al-ilm',
    name: 'حلية طالب العلم',
    category: 'الآداب',
    description: 'أدب الطلب وأخلاق حامل العلم',
    total_questions: {
      'التمهيدي': 30,
      'التأهيلي': 50,
      'المتقدم': 70
    }
  },
  
  {
    id: 'kitab-al-tawhid',
    name: 'كتاب التوحيد',
    category: 'العقيدة',
    description: 'تحقيق توحيد العبادة لله وحده',
    total_questions: {
      'التمهيدي': 35,
      'التأهيلي': 55,
      'المتقدم': 75
    }
  },
  
  {
    id: 'riyad-al-salihin',
    name: 'رياض الصالحين',
    category: 'الحديث',
    description: 'تهذيب النفوس بحديث النبي ﷺ',
    total_questions: {
      'التمهيدي': 45,
      'التأهيلي': 70,
      'المتقدم': 95
    }
  },
  
  {
    id: 'al-fiqh-al-muyassar',
    name: 'الفقه الميسر',
    category: 'الفقه',
    description: 'الفقه في ضوء الكتاب والسنة',
    total_questions: {
      'التمهيدي': 40,
      'التأهيلي': 65,
      'المتقدم': 90
    }
  },
  
  {
    id: 'al-najun-min-asr-al-tafaha',
    name: 'الناجون من عصر التفاهة',
    category: 'الآداب',
    description: 'توجيهات فكرية وإيمانية للثبات',
    total_questions: {
      'التمهيدي': 25,
      'التأهيلي': 40,
      'المتقدم': 55
    }
  }
]
```

---

## 🎯 Question Template

```javascript
{
  id: 'q-001',
  book_id: 'al-usul-al-thalatha',
  level: 'التمهيدي',
  
  question: 'ما هو الهدف الرئيسي من دراسة الأصول الثلاثة؟',
  
  options: [
    {
      id: 'opt-1',
      text: 'التسلية',
      is_correct: false
    },
    {
      id: 'opt-2',
      text: 'مضيعة الوقت',
      is_correct: false
    },
    {
      id: 'opt-3',
      text: 'الشهرة',
      is_correct: false
    },
    {
      id: 'opt-4',
      text: 'طلب العلم الشرعي هو عبادة يتقرب بها العبد إلى الله.',
      is_correct: true
    }
  ],
  
  explanation: 'طلب العلم الشرعي عبادة يتقرب بها العبد إلى الله تعالى، والأصول الثلاثة هي معرفة العبد ربه ودينه ونبيه ﷺ.',
  
  references: [
    'سورة الإسراء: 36',
    'حديث: «من سلك طريقاً يلتمس فيها علماً...»'
  ],
  
  difficulty: 1 // 1=easy, 2=medium, 3=hard
}
```

---

## 🔄 State Updates

### When User Answers Question

```javascript
function handleAnswer(questionId, selectedOption) {
  // 1. Check if correct
  const isCorrect = checkAnswer(questionId, selectedOption)
  
  // 2. Update progress
  const progress = JSON.parse(localStorage.getItem('tadarruj_progress_v2'))
  
  if (isCorrect) {
    progress.progress.correct_answers.push(questionId)
    progress.progress.current_streak++
  } else {
    progress.progress.wrong_answers.push(questionId)
    progress.progress.current_streak = 0
  }
  
  progress.progress.completed_questions.push(questionId)
  
  // 3. Calculate new score
  progress.score.current = calculateScore(progress)
  progress.score.percentage = (progress.score.current / progress.score.total) * 100
  
  // 4. Save to localStorage
  localStorage.setItem('tadarruj_progress_v2', JSON.stringify(progress))
  
  // 5. Update UI
  updateProgressIndicator()
  showFeedback(isCorrect)
}
```

---

## 🔐 Data Security Concerns

### ⚠️ Current Implementation Issues

1. **No Encryption**
```javascript
// Current: Plain text storage
localStorage.setItem('tadarruj_progress_v2', JSON.stringify(data))

// Recommended: Encrypted storage
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY)
localStorage.setItem('tadarruj_progress_v2', encrypted.toString())
```

2. **No Data Validation**
```javascript
// Vulnerable to XSS
const data = localStorage.getItem('tadarruj_progress_v2')
const parsed = JSON.parse(data) // Could be manipulated!

// Recommended: Validate schema
const parsed = JSON.parse(data)
if (validateProgressSchema(parsed)) {
  setState(parsed)
}
```

3. **CORS Vulnerability**
```javascript
// Any website can read this data
fetch('https://tadruj.vercel.app/')
  .then(r => r.text())
  .then(html => {
    // html contains all the JS with localStorage keys
    // Can exfiltrate user data
  })
```

---

## 📈 Performance Optimization

### Bundle Analysis

```javascript
// Bundle size: 581,993 bytes

// Breakdown:
React Core: ~130 KB
React DOM: ~50 KB
Application Code: ~350 KB
Styles: ~50 KB
Assets/Content: ~1 KB

// Recommendations:
// - Code splitting by book (lazy loading)
// - Compress Arabic strings
// - Use lighter React alternative (Preact)
```

---

## 🔍 Data Extraction Example

```javascript
// Extract user's full progress
function exportUserData() {
  return {
    progress: JSON.parse(localStorage.getItem('tadarruj_progress_v2')),
    profile: JSON.parse(localStorage.getItem('tadarruj_profile_v2')),
    help_ack: JSON.parse(localStorage.getItem('tadarruj_help_ack')),
    exported_at: new Date().toISOString()
  }
}

// Result:
{
  "progress": { /* ... */ },
  "profile": { /* ... */ },
  "help_ack": { "acknowledged": true },
  "exported_at": "2026-07-14T09:45:00.000Z"
}
```
