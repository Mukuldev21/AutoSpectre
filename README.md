
# AutoSpectre 🧠🧪
**AI‑Driven, Self‑Healing Playwright Test Generation Platform**

AutoSpectre automatically:
- Analyzes a given URL
- Discovers critical user flows
- Generates **self‑healing Page Objects**
- Generates **Playwright TypeScript tests**
- Learns selectors over time

> Input: **URL only**  
> Output: **Enterprise‑grade Playwright automation**

---

## 🏗 Architecture Overview

```mermaid
flowchart TD
    A[URL] --> B[DOM Analyzer]
    B --> C[Discovery Agent]
    C --> D[Design Agent]
    D --> E[Codegen Agent]
    E --> F[Generated Tests]

---

## 📋 Prerequisites

Before running AutoSpectre, ensure you have:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Generate tests from URL
npm run generate -- https://www.saucedemo.com

# 3. Run generated tests
npm run test
```

### 📝 Example Output

After running `npm run generate`, AutoSpectre creates test files in `generated/tests/`:

```typescript
// generated/tests/Login.spec.ts
import { test, expect } from '@playwright/test';

test('[Login] smoke', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/.+/);
});
```

---

## ✨ Key Features
- **AI‑powered flow discovery** - Automatically identifies critical user journeys
- **Auto‑generated tests** - Creates Playwright TypeScript tests from URL analysis
- **Agent‑based architecture** - Modular pipeline with specialized agents
- **Policy‑driven rules** - Configurable via Markdown policies
- **CI/CD ready** - Integrates seamlessly into existing pipelines

---

## 📌 Resume Line
> Built an AI‑driven QA platform that auto‑generates Playwright tests and self‑healing Page Objects from a single URL using agent‑based LLM orchestration.

---
