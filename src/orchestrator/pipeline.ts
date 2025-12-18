import { analyzeDOM } from '../analyzer/domAnalyzer';
import { generatePageObject } from '../agents/pageObjectAgent';
import { generateTests } from '../agents/testAgent';
import fs from 'fs';
import { reviewCode } from '../agents/reviewAgent';

import { sanitizeName } from '../utils/nameUtils';
import { CredentialManager } from '../utils/credentialManager';

export async function runPipeline(url: string, rules: string) {
  // Try to load saved credentials, otherwise fallback to env
  let credentials = CredentialManager.get(url);

  if (!credentials && url.includes('saucedemo')) {
    credentials = {
      user: process.env.DEMO_USER || 'standard_user',
      pass: process.env.DEMO_PASS || 'secret_sauce'
    };
  }

  const dom = await analyzeDOM(url, credentials);

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
      name: (b.name && b.name.length > 3) ? sanitizeName(b.name) + 'Button' : (b.text ? sanitizeName(b.text) + 'Button' : 'button'),
      selectors: [
        b.testId ? `[data-test-id="${b.testId}"]` : null,
        b.text ? `text=${b.text}` : null,
        b.id ? `#${b.id}` : null,
        b.name ? `button[name="${b.name}"]` : null,
        'button'
      ].filter(Boolean)
    }))),
    ...(dom.links ? dom.links.map((l: any) => ({
      name: (l.id && l.id.includes('title')) ? sanitizeName(l.text) + 'Link' : (l.text ? sanitizeName(l.text) + 'Link' : 'link'),
      selectors: [
        l.testId ? `[data-test-id="${l.testId}"]` : null,
        l.text ? `text=${l.text}` : null,
        l.id ? `#${l.id}` : null,
        `a[href="${l.href}"]`
      ].filter(Boolean)
    })) : []),
    ...(dom.headers ? dom.headers.map((h: any) => ({
      name: (h.text.toLowerCase().includes('error') ? 'errorMessage' : sanitizeName(h.text) + 'Title'),
      selectors: [
        `text=${h.text}`,
        h.level
      ].filter(Boolean)
    })) : []),
    ...(dom.containers ? dom.containers.map((c: any, index: number) => ({
      name: c.class.includes('error') ? 'errorMessage' : (c.id || `container_${index}`),
      selectors: [
        c.id ? `#${c.id}` : null,
        c.class ? `.${c.class.split(' ').join('.')}` : null
      ].filter(Boolean)
    })) : [])
  ];

  // Robustness: Ensure errorMessage locator exists for validation tests
  if (!elements.find(e => e.name === 'errorMessage')) {
    elements.push({
      name: 'errorMessage',
      selectors: ['.error-message-container', 'h3[data-test="error"]', '[data-test="error"]']
    });
  }

  await generatePageObject(pageName, elements);

  const tests = await generateTests(dom, rules, url);

  if (!reviewCode(tests)) {
    console.error("❌ Generated tests failed strict code review.");
    // For now, we write it anyway but with a warning, or we could throw. 
    // Blueprint says "Tests fail the pipeline", so let's throw.
    throw new Error("Pipeline Failed: Generated code violated safety rules (Raw Key Selectors found).");
  }

  fs.mkdirSync('generated/tests', { recursive: true });
  const outputPath = 'generated/tests/app.spec.ts';
  fs.writeFileSync(outputPath, tests);

  const testCount = (tests.match(/test\(/g) || []).length;
  console.log(`\n✅ Successfully generated ${testCount} tests in ${outputPath}`);
}
