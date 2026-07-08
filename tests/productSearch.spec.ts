import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductApi } from '../api/ProductApi';

test('T1_productSearch_validProduct_userCanSearchForProduct', async ({ page, request }) => {

    const homePage = new HomePage(page);
    await homePage.openHomePage();

    const productApi = new ProductApi();

    const product =
        await productApi.getFirstProduct(request);

    await homePage.searchForProduct(product.name);

    await expect(
        homePage.searchResultCount
    ).toContainText(product.name);

    await expect(
        homePage.getProductByName(product.name)
    ).toBeVisible();
});