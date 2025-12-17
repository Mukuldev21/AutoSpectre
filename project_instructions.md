
# AutoSpectre – How To Use

## 1️⃣ Prerequisites
- Node.js 18+
- npm
- Git

## 2️⃣ Install Dependencies
```bash
npm install
npx playwright install
```

## 3️⃣ Configure Policies
Edit:
```
policies/instructions.md
```
Define:
- Selector rules
- Assertion rules
- Flow priorities

## 4️⃣ Generate Tests
```bash
npm run generate -- https://www.saucedemo.com
```

This will:
- Analyze DOM
- Detect flows
- Generate Page Objects
- Generate tests

## 5️⃣ Run Tests
```bash
npm run test
```

## 6️⃣ Self-Healing Engine
If selectors break during runtime:
1.  **Detection**: The `selectorResolver` detects the failure.
2.  **Recovery**: Validates fallback selectors from `selector-memory.json` or generated candidates.
3.  **Healing**: If a fallback works, it's saved as the new primary selector in `selector-memory.json`.
4.  **Reporting**: The healing event is logged for audit.

## 7️⃣ LLM Configuration (Groq)
This project uses **Groq** for high-speed LLM inference.
1.  Get an API Key from [Groq Console](https://console.groq.com/).
2.  Set it in `.env`:
    ```env
    GROK_API_KEY=your_groq_api_key_here
    ```
3.  The system uses `llama-3.3-70b-versatile` by default.

## 8️⃣ CI Usage
Call `npm run generate` inside pipeline before tests.

---
