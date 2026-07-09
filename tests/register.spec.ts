import { test, expect } from '@playwright/test';
import userData from '../test-data/user.json';
import { generateUniqueEmail } from '../utils/testDataGenerator';
import { RegistrationPage } from '../pages/RegistrationPage';
import { UserApi } from '../api/UserApi';
import { User } from '../models/User';
import { Logger } from '../utils/logger/logger';

test.beforeEach(async ({}, testInfo) => {
    Logger.info(`===== START: ${testInfo.title} =====`);
});

test.afterEach(async ({}, testInfo) => {
    Logger.info(
        `===== END: ${testInfo.title} (${testInfo.status}) =====`
    );
});

test('T1_registration_validUser_userIsRegistered', async ({ page, request }) => {

    const registerPage = new RegistrationPage(page);

    await registerPage.openRegistrationPage();

    const user: User = {
        ...userData,
        email: generateUniqueEmail()
    };

    await registerPage.registerUser(user);

    
    Logger.info('Verifying registration success');
    await expect(page).toHaveURL(/.*\/login$/);

    const userApi = new UserApi();
    const loginResponse = await userApi.loginUser(
        request,
        user
    );

    
    Logger.info('Verifying authentication response');
    expect(loginResponse.status()).toBe(200);

    const responseBody = await loginResponse.json();

    expect(responseBody.access_token).toBeTruthy();
    expect(responseBody.token_type).toBe('bearer');
});