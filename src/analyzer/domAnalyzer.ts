
import { chromium } from 'playwright';

export async function analyzeDOM(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const dom = await page.evaluate(() => ({
    inputs: Array.from(document.querySelectorAll('input')).map(i => i.type),
    buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText)
  }));
  await browser.close();
  return dom;
}
