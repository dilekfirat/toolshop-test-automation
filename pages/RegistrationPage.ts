import { Page, Locator } from '@playwright/test';
import { User } from '../models/User';

export class RegistrationPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dobInput: Locator;
    readonly countryInput: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    //readonly emailErrorMessage: Locator;
    //readonly passwordErrorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.dobInput = page.locator('[data-test="dob"]');
        this.countryInput = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.locator('[data-test="register-submit"]');
        //this.errorMessage = page.locator('[data-test="register-error"]');
    }

    async openRegistrationPage(): Promise<void> {
        await this.page.goto('/auth/register');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async enterDOB(dob: string): Promise<void> {
        await this.dobInput.fill(dob);
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryInput.selectOption(country);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        await this.postalCodeInput.fill(postalCode);
    }

    async enterHouseNumber(houseNumber: string): Promise<void> {
        await this.houseNumberInput.fill(houseNumber);
    }

    async enterStreet(street: string): Promise<void> {
        await this.streetInput.fill(street);
    }

    async enterCity(city: string): Promise<void> {
        await this.cityInput.fill(city);
    }

    async enterState(state: string): Promise<void> {
        await this.stateInput.fill(state);
    }

    async enterPhone(phone: string): Promise<void> {
        await this.phoneInput.fill(phone);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickRegister(): Promise<void> {
        await this.registerButton.click();
    }

    async registerUser(user: User): Promise<void> {
        await this.enterFirstName(user.first_name);
        await this.enterLastName(user.last_name);
        await this.enterDOB(user.dob);
        await this.selectCountry(user.address.country);
        await this.enterPostalCode(user.address.postal_code);
        await this.enterHouseNumber(user.address.house_number);
        await this.enterStreet(user.address.street);
        await this.enterCity(user.address.city);
        await this.enterState(user.address.state);
        await this.enterPhone(user.phone);
        await this.enterEmail(user.email);
        await this.enterPassword(user.password);
        await this.clickRegister();
    }
}