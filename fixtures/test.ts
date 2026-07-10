import { test as base } from '@playwright/test';
import { Logger } from '../utils/logger/logger';

export const test = base;

test.beforeEach(async ({}, testInfo) => {
    Logger.info(`===== START: ${testInfo.title} =====`);
});

test.afterEach(async ({}, testInfo) => {
    Logger.info(
        `===== END: ${testInfo.title} (${testInfo.status}) =====`
    );
});

export { expect } from '@playwright/test';