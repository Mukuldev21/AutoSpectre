
import { Page, Locator } from '@playwright/test';
import { recordHealing, getHealedSelector } from './selectorMemory';
import { logHealing } from './healingLogger';

export async function resolveSelector(
    page: Page,
    candidates: string[],
    elementName: string
): Promise<Locator> {
    // 1. Check if we have a healed selector
    const healed = getHealedSelector(elementName);
    if (healed) {
        // Try healed first (prioritize learned knowledge)
        const locator = page.locator(healed);
        try {
            if (await locator.first().isVisible({ timeout: 2000 })) {
                return locator.first();
            }
        } catch (_) {
            // Healed selector invalid, proceed to candidates
        }
    }

    // 2. Iterate candidates
    for (const selector of candidates) {
        try {
            const locator = page.locator(selector);
            // Fast check
            if (await locator.first().isVisible({ timeout: 2000 })) {
                if (selector !== candidates[0]) {
                    // If we used a fallback (or candidate that wasn't primary), record it
                    // Actually, if we use *any* candidate that works, we might want to know?
                    // The blueprint logic: "if (selector !== candidates[0]) recordHealing"
                    // Also, if healed selector failed, and we found a new one from candidates, we should update memory.

                    if (selector !== candidates[0] || (healed && healed !== selector)) {
                        recordHealing(elementName, selector);
                        logHealing(elementName, selector);
                    }
                }
                return locator.first();
            }
        } catch (_) { }
    }

    throw new Error(`Unable to resolve selector for ${elementName}`);
}
