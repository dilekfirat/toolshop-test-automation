import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import userData from '../test-data/user.json';
import { generateUniqueEmail } from '../utils/testDataGenerator';
import { UserApi } from '../api/UserApi';


test('user can login with valid credentials', async ({ page, request }) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    const user = {
        ...userData,
        email: generateUniqueEmail()
    };

    const userApi = new UserApi();
    await userApi.createUser(request, user);

    await loginPage.loginUser(user.email, user.password);

    await expect(page).toHaveURL(/.*\/account$/);
});