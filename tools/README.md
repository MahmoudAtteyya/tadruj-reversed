# Security Assessment Tools

This directory contains analysis and exploitation tools for the tadruj.vercel.app security assessment.

## 📁 Structure

```
tools/
├── deobfuscate.py          # JavaScript beautifier & analyzer
├── analyze.py              # Bundle analyzer
└── exploit-poc/
    ├── cors-exploit.html   # CORS vulnerability PoC
    ├── xss-test.html       # XSS test payloads
    └── data-exfil.html     # Data exfiltration demo
```

---

## 🛠️ Tools

### 1. deobfuscate.py

Beautify and analyze JavaScript bundles.

```bash
# Basic usage
python3 deobfuscate.py ../source/bundle.min.js

# Custom output
python3 deobfuscate.py bundle.min.js beautified.js
```

**Features:**
- ✅ Basic JavaScript beautification
- ✅ String extraction
- ✅ Arabic string detection
- ✅ URL extraction
- ✅ Function counting

---

### 2. analyze.py

Deep analysis of JavaScript bundles.

```bash
python3 analyze.py --target https://tadruj.vercel.app/
```

**Output:**
- Bundle size analysis
- Dependency mapping
- API endpoint detection
- Security vulnerability scanning

---

### 3. exploit-poc/cors-exploit.html

Proof of concept for CORS vulnerability.

**Usage:**
1. Open in browser
2. Click "Execute Exploit"
3. View results

**What it demonstrates:**
- Cross-origin request succeeds
- HTML/JS bundle readable
- Data exfiltration possible

---

## 🎯 Example Usage

### Analyze Local File

```bash
cd /opt/data/tadruj-reversed/tools
python3 deobfuscate.py ../source/bundle.min.js > /tmp/analysis.txt
```

### Test CORS Vulnerability

```bash
# Start local server
cd exploit-poc
python3 -m http.server 8080

# Open in browser
# http://localhost:8080/cors-exploit.html
```

### Extract API Endpoints

```bash
grep -r "fetch\|axios\|XMLHttpRequest" ../source/
```

---

## 📊 Automated Analysis

```bash
# Full pipeline
python3 deobfuscate.py ../source/bundle.min.js beautified.js
python3 analyze.py --input beautified.js > report.json
```

---

## ⚠️ Disclaimer

These tools are for **educational purposes only**. Use only on systems you have explicit permission to test.

---

## 📚 Related Documentation

- [Security Findings](../docs/SECURITY_FINDINGS.md)
- [Application Flow](../docs/APPLICATION_FLOW.md)
- [Data Structures](../docs/DATA_STRUCTURES.md)
