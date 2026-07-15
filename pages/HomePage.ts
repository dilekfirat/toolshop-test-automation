import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger/logger';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultCount: Locator;
    readonly noResultsFoundMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.searchResultCount =
            page.locator('[data-test="search-result-count"]');
        this.noResultsFoundMessage = page.locator('[data-test="no-results"]');
    }

    async openHomePage(): Promise<void> {
        Logger.info('Opening home page');
        await this.page.goto('/');
    }

    async enterSearchQuery(query: string): Promise<void> {
        Logger.info('Entering search term');
        await this.searchInput.fill(query);
    }

    async clickSearch(): Promise<void> {
        Logger.info('Clicking search button');
        await this.searchButton.click();
    }

    async searchForProduct(query: string): Promise<void> {
        await this.enterSearchQuery(query);
        await this.clickSearch();
    }

    getProductByName(name: string) : Locator {
        return this.page
            .locator('[data-test="product-name"]')
            .filter({ hasText: name });
    }
}   