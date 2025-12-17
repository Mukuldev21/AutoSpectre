
import { Page, Locator } from '@playwright/test';
import { resolveSelector } from '../healing/selectorResolver';

export class BasePage {
    constructor(protected page: Page) { }

    protected async getElement(elementName: string, candidates: string[]): Promise<Locator> {
        return resolveSelector(this.page, candidates, elementName);
    }

    async goto(url: string) {
        await this.page.goto(url);
    }
}
