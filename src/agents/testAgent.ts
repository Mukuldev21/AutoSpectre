
import { callLLM } from '../llm/llmClient';

import fs from 'fs';
import path from 'path';

export async function generateTests(domJson: any, rules: string, url: string) {
    const promptPath = path.join(process.cwd(), 'prompts', 'test-agent.prompt.md');
    const systemPrompt = fs.existsSync(promptPath)
        ? fs.readFileSync(promptPath, 'utf-8')
        : "You are a senior SDET. Enforce Page Object Model.";

    const prompt = `
${systemPrompt}

DOM:
${JSON.stringify(domJson, null, 2)}

Rules:
${rules}

Target URL: ${url}
`;
    return await callLLM(prompt);
}
