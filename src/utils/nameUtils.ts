export function sanitizeName(name: string): string {
    if (!name) return '';
    // Remove non-alphanumeric
    let clean = name.replace(/[^a-zA-Z0-9]/g, '');
    // Ensure it starts with a letter
    if (/^[0-9]/.test(clean)) {
        clean = '_' + clean;
    }
    return clean;
}

export function toCamelCase(str: string): string {
    let camel = str.replace(/[-_ ]+([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
    // Lowercase first letter if it's PascalCase
    if (camel.length > 0 && /^[A-Z]/.test(camel)) {
        camel = camel.charAt(0).toLowerCase() + camel.slice(1);
    }
    // Ensure valid start
    if (/^[0-9]/.test(camel)) {
        camel = '_' + camel;
    }
    return camel;
}
