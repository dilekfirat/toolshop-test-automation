import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { User } from '../models/User';
import { environments } from '../config/environments';
import { Logger } from '../utils/logger/logger';

export class UserApi {

    async createUser(
        request: APIRequestContext,
        user: User
    ): Promise<void> {

        Logger.info('Creating user via API');
        const response = await request.post(
            `${environments.qa.apiUrl}/users/register`,
            {
                data: user
            }
        );

        Logger.info('Verifying user creation response');
        expect(response.ok()).toBeTruthy();
    }

    async loginUser(
        request: APIRequestContext,
        user: User
    ): Promise<APIResponse> {

        Logger.info('Logging in user via API');

        const response = await request.post(
            `${environments.qa.apiUrl}/users/login`,
            {
                data: {
                    email: user.email,
                    password: user.password
                }
            }
        );

        Logger.info('Verifying login response');
        expect(response.ok()).toBeTruthy();

        return response;
    }
}