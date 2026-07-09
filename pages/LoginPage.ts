import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger/logger';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.errorMessage = page.locator('[data-test="login-error"]');
    }

    async openLoginPage(): Promise<void> {
        Logger.info('Opening login page');
        await this.page.goto('/auth/login');
    }

    async enterEmail(email: string): Promise<void> {
        Logger.info('Entering email');
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        Logger.info('Entering password');
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        Logger.info('Clicking login button');
        await this.loginButton.click();
    }

    async loginUser(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}