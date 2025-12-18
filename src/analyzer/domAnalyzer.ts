
import { chromium } from 'playwright';

export async function analyzeDOM(url: string, credentials?: { user: string, pass: string }) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Helper to extract DOM elements
  const extractElements = async () => ({
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({
      type: i.type,
      name: i.name,
      id: i.id,
      placeholder: i.placeholder,
      testId: i.getAttribute('data-test-id')
    })),
    buttons: Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText,
      id: b.id,
      name: b.getAttribute('name'),
      testId: b.getAttribute('data-test-id')
    })),
    links: Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText,
      href: a.href,
      id: a.id,
      testId: a.getAttribute('data-test-id')
    })),
    headers: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
      level: h.tagName.toLowerCase(),
      text: (h as HTMLElement).innerText
    })),
    containers: Array.from(document.querySelectorAll('div, section, main')).map(div => ({
      id: div.id,
      class: div.className,
      items: div.querySelectorAll('input, button').length
    })).filter(div => div.items > 2 || (div.id && div.id.length > 5) || (div.class && div.class.includes('container')))
  });

  const dom1 = await page.evaluate(extractElements);

  if (credentials) {
    console.log('🔐 Attempting heuristic login for post-login analysis...');
    try {
      // Heuristic Login Logic
      await page.fill('input[type="text"], input[name*="user"], input[placeholder*="user"]', credentials.user);
      await page.fill('input[type="password"], input[name*="pass"], input[placeholder*="pass"]', credentials.pass);
      await page.click('button, input[type="submit"]');
      await page.waitForLoadState('networkidle');

      const dom2 = await page.evaluate(extractElements);

      // Merge DOMs with robust deduplication (handling intra-list duplicates)
      ['inputs', 'buttons', 'links', 'headers', 'containers'].forEach(key => {
        const k = key as keyof typeof dom1;
        const combined = [...dom1[k], ...dom2[k]];
        const uniqueMap = new Map();

        combined.forEach((item: any) => {
          const id = item.id || item.text || item.name || JSON.stringify(item.selectors);
          if (!uniqueMap.has(id)) {
            uniqueMap.set(id, item);
          }
        });

        dom1[k] = Array.from(uniqueMap.values()) as any;
      });
      console.log('✅ Post-login layout captured and deduplicated.');
    } catch (e) {
      console.warn('⚠️ Login heuristic failed, continuing with single-page analysis.', e);
    }
  }

  await browser.close();
  return dom1;
}
