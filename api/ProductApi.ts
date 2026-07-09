import { APIRequestContext, expect } from '@playwright/test';
import { environments } from '../config/environments';
import { Logger } from '../utils/logger/logger';

export class ProductApi {

    async getAllProducts(
        request: APIRequestContext
    ) {
        Logger.info('Retrieving all products via API');
        const response = await request.get(
            `${environments.qa.apiUrl}/products`
        );
        Logger.info('Verifying get all products response');
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async getFirstProduct(
        request: APIRequestContext
    ) {
        const response = await this.getAllProducts(request);
        Logger.info('Selecting first product from response');
        return response.data[0];
    }
}
