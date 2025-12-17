
import { analyzeDOM } from '../analyzer/domAnalyzer';
import { generatePageObject } from '../agents/pageObjectAgent';
import { generateTests } from '../agents/testAgent';
import fs from 'fs';

export async function runPipeline(url: string, rules: string) {
  const dom = await analyzeDOM(url);

  // 1. Generate Page Object
  // We'll create a single "AppPage" for simplicity as per current scope, 
  // or derive name from URL/Title if advanced.
  const pageName = 'AppPage';

  const elements = [
    ...(dom.inputs.map((i: any) => ({
      name: i.name || i.id || i.type || 'input',
      selectors: [
        i.testId ? `[data-test-id="${i.testId}"]` : null,
        i.name ? `input[name="${i.name}"]` : null,
        i.id ? `#${i.id}` : null,
        i.placeholder ? `input[placeholder="${i.placeholder}"]` : null,
        `input[type="${i.type}"]`
      ].filter(Boolean)
    }))),
    ...(dom.buttons.map((b: any) => ({
      name: b.text ? b.text.replace(/\s+/g, '') + 'Button' : 'button',
      selectors: [
        b.testId ? `[data-test-id="${b.testId}"]` : null,
        b.text ? `text=${b.text}` : null,
        b.id ? `#${b.id}` : null,
        b.name ? `button[name="${b.name}"]` : null,
        'button'
      ].filter(Boolean)
    })))
  ];

  await generatePageObject(pageName, elements);

  // 2. Generate Tests
  const tests = await generateTests(dom, rules);
  fs.mkdirSync('generated/tests', { recursive: true });
  fs.writeFileSync('generated/tests/app.spec.ts', tests);
}
