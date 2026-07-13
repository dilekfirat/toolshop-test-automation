import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import userData from '../test-data/user.json';
import { generateUniqueEmail } from '../utils/testDataGenerator';
import { UserApi } from '../api/UserApi';
import { User } from '../models/User';
import { Logger } from '../utils/logger/logger';

// Test lifecycle logging
test.beforeEach(async ({}, testInfo) => {
    Logger.info(`===== START: ${testInfo.title} =====`);
});

test.afterEach(async ({}, testInfo) => {
    Logger.info(`===== END: ${testInfo.title} (${testInfo.status}) =====`);
});


test('T1_login_validUserWithCorrectPassword_redirectedToAccountPage', async ({ page, request }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    const user: User = {
        ...userData,
        email: generateUniqueEmail()
    };

    const userApi = new UserApi();
    await userApi.createUser(request, user);

    await loginPage.loginUser(user.email, user.password);

    await expect(page).toHaveURL(/.*\/account$/);
});

test('T4_login_invalidUserWithIncorrectPassword_userSeesErrorMessage', async ({ page, request }) => {

    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();

    const user: User = {
        ...userData,
        email: generateUniqueEmail()
    };
    const userApi = new UserApi();
    await userApi.createUser(request, user);

    await loginPage.loginUser(user.email, user.password + 'wrong');

    Logger.info('Verifying login error message');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
    await expect(page).toHaveURL(/.*\/auth\/login$/);
});