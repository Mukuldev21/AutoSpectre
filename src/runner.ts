
import { runPipeline } from './orchestrator/pipeline';
import fs from 'fs';
require('dotenv').config();

// Ensure policies/instructions.md exists or use default
const rulesPath = 'policies/instructions.md';
const rules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : 'No specific rules.';

const args = process.argv.slice(2);
const url = args[0];

// Support both flags (--user=X) and positional args (url user pass)
let userArg = args.find(a => a.startsWith('--user='))?.split('=')[1];
let passArg = args.find(a => a.startsWith('--pass='))?.split('=')[1];

if (!userArg && !passArg && args.length >= 3) {
    userArg = args[1];
    passArg = args[2];
}

console.log(`DEBUG: URLs=${url}, User=${userArg}, Pass=${passArg}`);

if (!url) {
    console.error("Please provide a URL: npm run generate <url> [user] [pass]");
    process.exit(1);
}

// Auto-save credentials if provided
import { CredentialManager } from './utils/credentialManager';
if (userArg && passArg) {
    CredentialManager.save(url, { user: userArg, pass: passArg });
}

runPipeline(url, rules).catch(console.error);
