
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

## 6️⃣ Selector Healing
If UI changes:
- Tests auto‑recover
- New selectors stored in `selector-memory.json`

## 7️⃣ CI Usage
Call `npm run generate` inside pipeline before tests.

---
