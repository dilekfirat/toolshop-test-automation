import { test, expect } from '@playwright/test';
import userData from '../test-data/user.json';
import { generateUniqueEmail } from '../utils/testDataGenerator';
import { RegistrationPage } from '../pages/RegistrationPage';
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

test('T4_registration_existingEmail_userSeesErrorMessage', async ({ page, request }) => {

    const registerPage = new RegistrationPage(page);

    await registerPage.openRegistrationPage();

    const user: User = {
        ...userData,
        email: generateUniqueEmail()
    };

    //create user via API to simulate existing user
    const userApi = new UserApi();
    await userApi.createUser(request, user);

    // Attempt to register the same user again
    await registerPage.registerUser(user);

    
    Logger.info('Verifying registration failure due to existing email');
    await expect(page).toHaveURL(/.*\/register$/);
    await expect(registerPage.registerErrorMessage).toBeVisible();
    await expect(registerPage.registerErrorMessage)
    .toHaveText('A customer with this email address already exists.');

});