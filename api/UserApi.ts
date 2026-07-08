import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../models/User';
import { environments } from '../config/environments';

export class UserApi {

    async createUser(
        request: APIRequestContext,
        user: User
    ): Promise<void> {

        const response = await request.post(
            `${environments.qa.apiUrl}/users/register`,
            {
                data: user
            }
        );

        console.log(response.status());
        console.log(await response.text());
        expect(response.ok()).toBeTruthy();
    }

    async loginUser(
        request: APIRequestContext,
        user: User
    ) {

        return await request.post(
            `${environments.qa.apiUrl}/users/login`,
            {
                data: {
                    email: user.email,
                    password: user.password
                }
            }
        );
    }
}