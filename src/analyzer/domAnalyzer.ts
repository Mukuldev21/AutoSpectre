
import { chromium } from 'playwright';

export async function analyzeDOM(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const dom = await page.evaluate(() => ({
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
    }))
  }));
  await browser.close();
  return dom;
}
