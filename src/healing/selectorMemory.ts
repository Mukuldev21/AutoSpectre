
import fs from 'fs';

const MEMORY_FILE = 'selector-memory.json';

export function recordHealing(element: string, selector: string) {
    const memory = fs.existsSync(MEMORY_FILE)
        ? JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'))
        : {};

    memory[element] = selector;
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

export function getHealedSelector(element: string): string | null {
    if (!fs.existsSync(MEMORY_FILE)) return null;
    const memory = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
    return memory[element] || null;
}
