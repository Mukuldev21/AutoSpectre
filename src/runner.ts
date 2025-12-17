
import { runPipeline } from './orchestrator/pipeline';
import fs from 'fs';

const url = process.argv[2];
if (!url) throw new Error('URL required');

// Ensure policies/instructions.md exists or use default
const rulesPath = 'policies/instructions.md';
const rules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : 'No specific rules.';

runPipeline(url, rules);
