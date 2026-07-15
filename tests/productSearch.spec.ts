import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductApi } from '../api/ProductApi';
import { Logger } from '../utils/logger/logger';
import productData from '../test-data/productSearch.json';

// Test lifecycle logging
test.beforeEach(async ({}, testInfo) => {
    Logger.info(`===== START: ${testInfo.title} =====`);
});

test.afterEach(async ({}, testInfo) => {
    Logger.info(`===== END: ${testInfo.title} (${testInfo.status}) =====`);
});

test('T1_productSearch_validProduct_userCanSearchForProduct', async ({ page, request }) => {

    const homePage = new HomePage(page);
    await homePage.openHomePage();

    const productApi = new ProductApi();

    const product =
        await productApi.getFirstProduct(request);

    await homePage.searchForProduct(product.name);

    Logger.info('Verifying search results');
    await expect(
        homePage.searchResultCount
    ).toContainText(product.name);

    await expect(
        homePage.getProductByName(product.name)
    ).toBeVisible();
});

test('T4_productSearch_searchNonExistingProduct_noResultsFound', async ({ page }) => {

    const homePage = new HomePage(page);
    await homePage.openHomePage();

    await homePage.searchForProduct(productData.nonExistingProduct);

    Logger.info('Verifying search results for non-existing product');
    await expect(
        homePage.searchResultCount
    ).toContainText(productData.nonExistingProduct);

    await expect(
        homePage.noResultsFoundMessage
    ).toBeVisible();
});