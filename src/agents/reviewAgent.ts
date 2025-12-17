
export function reviewCode(code: string): boolean {
    const rawPatterns = [
        /page\.click\(/,
        /page\.fill\(/,
        /page\.locator\(/,
        /page\.\$\(/,
        /page\.\$\$\(/
    ];

    let errors: string[] = [];

    // Check for raw Playwright actions that bypass Page Objects
    // Using simple regex for now. In a real parser we'd check AST.
    for (const pattern of rawPatterns) {
        if (pattern.test(code)) {
            errors.push(`Found raw Playwright call matching ${pattern}. Use Page Objects instead.`);
        }
    }

    if (errors.length > 0) {
        console.error("Code Review Failed:", errors);
        return false;
    }

    return true;
}

export function validatePageObject(code: string): boolean {
    if (!code.includes('extends BasePage')) return false;
    if (!code.includes('getElement(')) return false;
    return true;
}
