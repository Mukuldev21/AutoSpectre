import { analyzeDOM } from '../analyzer/domAnalyzer';
import { generatePageObject } from '../agents/pageObjectAgent';
import { generateTests } from '../agents/testAgent';
import fs from 'fs';
import { reviewCode } from '../agents/reviewAgent';

export async function runPipeline(url: string, rules: string) {
  const dom = await analyzeDOM(url);

  const pageName = 'AppPage';

  const elements = [
    ...(dom.inputs.map((i: any) => ({
      name: i.name || i.id || i.type || 'input',
      selectors: [
        i.testId ? `[data-test-id="${i.testId}"]` : null,
        i.name ? `input[name="${i.name}"]` : null,
        i.id ? `#${i.id}` : null,
        `input[placeholder="${i.placeholder || ''}"]`,
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
    }))),
    ...(dom.links ? dom.links.map((l: any) => ({
      name: l.text ? l.text.replace(/\s+/g, '') + 'Link' : 'link',
      selectors: [
        l.testId ? `[data-test-id="${l.testId}"]` : null,
        l.text ? `text=${l.text}` : null,
        l.id ? `#${l.id}` : null,
        `a[href="${l.href}"]`
      ].filter(Boolean)
    })) : [])
  ];

  await generatePageObject(pageName, elements);

  const tests = await generateTests(dom, rules);

  if (!reviewCode(tests)) {
    console.error("❌ Generated tests failed strict code review.");
    // For now, we write it anyway but with a warning, or we could throw. 
    // Blueprint says "Tests fail the pipeline", so let's throw.
    throw new Error("Pipeline Failed: Generated code violated safety rules (Raw Key Selectors found).");
  }

  fs.mkdirSync('generated/tests', { recursive: true });
  fs.writeFileSync('generated/tests/app.spec.ts', tests);
}
