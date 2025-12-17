import fs from 'fs';

function toCamelCase(str: string) {
    return str.replace(/[-_ ]+([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
}

export async function generatePageObject(
    pageName: string,
    elements: any[]
) {
    const content = `import { BasePage } from './BasePage';

export class ${pageName} extends BasePage {
${elements
            .map(e => `  async ${toCamelCase(e.name)}() {
    return this.getElement('${e.name}', ${JSON.stringify(e.selectors, null, 2)});
  }`)
            .join('\n')}
}`;

    fs.mkdirSync('src/pages', { recursive: true });
    fs.writeFileSync(`src/pages/${pageName}.ts`, content);
}
