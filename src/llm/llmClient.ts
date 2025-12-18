
import { Groq } from 'groq-sdk';

export async function callLLM(prompt: string): Promise<string> {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
        console.warn("WARNING: GROK_API_KEY is missing. Using placeholder.");
        return "// Generative AI output would appear here (API Key Missing)";
    }

    const groq = new Groq({ apiKey });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert SDET generating Playwright tests." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
            max_tokens: 8192,
        });

        const content = chatCompletion.choices[0]?.message?.content || "// No content returned";

        // Extract content inside ```typescript or ``` blocks
        const codeBlockRegex = /```(?:typescript|ts)?([\s\S]*?)```/;
        const match = content.match(codeBlockRegex);

        if (match && match[1]) {
            return match[1].trim();
        }

        const cleanContent = content.replace(/```typescript/g, '').replace(/```/g, '').trim();
        return cleanContent;

    } catch (error) {
        console.error("LLM Request Failed:", error);
        return `// LLM Request Failed: ${error}`;
    }
}
