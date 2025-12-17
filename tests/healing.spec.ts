
import { test, expect } from '@playwright/test';
import { resolveSelector } from '../src/healing/selectorResolver';
import fs from 'fs';

test('Self-Healing Logic Verification', async ({ page }) => {
    // Setup a dummy page
    await page.setContent('<button id="target">Success</button>');

    // Define candidates: Primary is broken, Secondary works
    const candidates = ['.broken-class', '#target'];
    const elementName = 'TestButton';

    // Clear memory for clean test
    if (fs.existsSync('selector-memory.json')) {
        fs.unlinkSync('selector-memory.json');
    }

    // 1. Resolve Selector (should trigger healing)
    console.log('Attempting resolution...');
    const element = await resolveSelector(page, candidates, elementName);
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Success');

    // 2. Verify Memory
    const memory = JSON.parse(fs.readFileSync('selector-memory.json', 'utf-8'));
    expect(memory[elementName]).toBe('#target');
    console.log('Healing recorded successfully:', memory);
});
