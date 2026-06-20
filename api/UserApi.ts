import { APIRequestContext, expect } from '@playwright/test';

export class UserApi {
async createUser(
    request: APIRequestContext,
    user: any
): Promise<void> {

    const response = await request.post(
        'https://api.practicesoftwaretesting.com/users/register',
        {
            data: user
        }
    );

    expect(response.ok()).toBeTruthy();
}
}