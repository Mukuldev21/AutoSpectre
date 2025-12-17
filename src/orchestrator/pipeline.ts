
import { analyzeDOM } from '../analyzer/domAnalyzer';
import { discoverFlows } from '../agents/discoveryAgent';
import { designTests } from '../agents/designAgent';
import { generateTest } from '../agents/codegenAgent';
import fs from 'fs';

export async function runPipeline(url: string) {
  const dom = await analyzeDOM(url);
  const flows = await discoverFlows(dom);
  const specs = designTests(flows);

  for (const spec of specs) {
    const code = await generateTest(spec, url);
    fs.mkdirSync('generated/tests', { recursive: true });
    fs.writeFileSync(`generated/tests/${spec.flow}.spec.ts`, code);
  }
}
