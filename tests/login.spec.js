import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.loginUser(
        'customer@practicesoftwaretesting.com',
        'welcome01'
    );

    await expect(page).toHaveURL(/.*\/account$/);
});