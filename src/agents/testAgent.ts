
import { callLLM } from '../llm/llmClient';

export async function generateTests(domJson: any, rules: string) {
    const prompt = `
You are a senior SDET.
Your task:
- Analyze provided DOM structure
- Identify critical user flows
- Follow instructions.md strictly
- Enforce Page Object Model
- Avoid flaky selectors
- Use Page Objects extending BasePage
- Use getElement() method in Page Objects

DOM:
${JSON.stringify(domJson, null, 2)}

Rules:
${rules}
`;
    return await callLLM(prompt);
}
