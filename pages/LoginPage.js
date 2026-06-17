export class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInLink = page.locator('[data-test="nav-sign-in"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async openLoginPage() {
        await this.signInLink.click();
    }

    async enterEmail(email){
        await this.emailInput.fill(email);
    }
    async enterPassword(password){
        await this.passwordInput.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    async loginUser(email, password){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}