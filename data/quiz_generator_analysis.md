# eN Quiz Generator | دالة توليد الأسئلة

---

## 📋 Function Signature

```javascript
eN = e => [
  { question, options, correctIndex, explanation },
  { question, options, correctIndex, explanation }
]
```

---

## 💻 Source Code (من bundle.min.js)

```javascript
eN = e => [
  {
    question: `ما هو الهدف الرئيسي من دراسة ${e}؟`,
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
]
```

---

## 🔍 How It Works

### Input:
- **Parameter `e`**: عنوان المحاضرة (string)
- **Example**: `"الأصول الثلاثة - المحاضرة 1"`

### Output:
- **Array of 2 question objects**
- Each object: `{ question, options, correctIndex, explanation }`

### Mechanism:

```
Lecture Creation (ht function)
    ↓
Creates lecture object with:
    - id: "intro-1-lec-1"
    - title: "المحاضرة 1"
    - videoUrl: YouTube embed URL
    - summary: Fixed template
    - quiz: eN(`${bookTitle} - المحاضرة ${u+1}`)
              ↓
              Returns 2 template questions
```

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Questions Generated | 2 per lecture |
| Total Lectures | 1,245 |
| Total Questions | 2,490 |
| **Unique Question Templates** | **2 ONLY** |
| Question 1 (Dynamic) | Includes lecture title |
| Question 2 (Static) | Same for all lectures |

---

## ⚠️ Important Note

**هذه الأسئلة ليست مولدة بالذكاء الاصطناعي!**

### What this IS:
✅ Template-based question generation
✅ Fixed question structure
✅ Client-side generation
✅ Lightweight & fast

### What this is NOT:
❌ AI-generated questions
❌ Diverse questions per lecture
❌ Content-specific questions
❌ External API calls

---

## 🔄 Integration in Lectures

```javascript
// Lecture creation function
ht = (e, t, r) => t.map((a, u) => ({
  id: `${e}-lec-${u+1}`,
  title: `المحاضرة ${u+1}`,
  videoUrl: JC(a),  // YouTube URL converter
  summary: `تتناول هذه المحاضرة مقدمات هامة في ${r}...`,
  quiz: eN(`${r} - المحاضرة ${u+1}`)  // ← Quiz generator called here
}))
```

---

## 📝 Example Usage

```javascript
// Call with lecture title
const lectureTitle = "الأصول الثلاثة - المحاضرة 1";
const questions = eN(lectureTitle);

// Result:
[
  {
    question: "ما هو الهدف الرئيسي من دراسة الأصول الثلاثة - المحاضرة 1؟",
    options: ["طلب العلم النافع", ...],
    correctIndex: 0,
    explanation: "طلب العلم الشرعي..."
  },
  {
    question: "هل يعتبر الإخلاص شرطاً في قبول العمل؟",
    options: ["نعم", ...],
    correctIndex: 0,
    explanation: "العمل لا يقبل..."
  }
]
```

---

## 🚀 Future Enhancement

### To implement AI-generated questions:

```javascript
async function generateAIQuestions(lectureTitle, lectureContent, level) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Generate 5 questions about: ${lectureTitle}\nContent: ${lectureContent}\nLevel: ${level}`
      }]
    })
  });
  
  return parseQuestions(response);
}
```

---

**File Created:** 2026-07-14
**Purpose:** Document quiz generation mechanism
**Status:** Template-based (not AI)
