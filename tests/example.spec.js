// @ts-check
const { test, expect } = require('@playwright/test');
const user = require('../user.js');

test('successfulAuthorization', async ({ page }) => {
    await page.goto('https://netology.ru/');
    await Promise.all([
        page.waitForURL('**/?modal=sign_in'),
        page.click('text=Войти')
    ]);
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.email);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(user.password);
    await Promise.all([
        page.waitForURL('https://netology.ru/profile/8058662'),
        page.locator('[data-testid="login-submit-btn"]').click(),
        await page.screenshot({ path: 'screenshot1.png' })
    ]);
    await expect(page).toHaveURL('https://netology.ru/profile/8058662');
    await page.screenshot({ path: 'screenshot.png' });
});
test('authorizationWithWrongEmail', async ({ page }) => {
    await page.goto('https://netology.ru/');
    await Promise.all([
        page.waitForURL('https://netology.ru/?modal=sign_in'),
        page.click('text=Войти')
    ]);
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.wrongEmail);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(user.password);
    await Promise.all([
        page.locator('[data-testid="login-submit-btn"]').click()
    ]);
    await page.waitForSelector('[data-testid="login-error-hint"]');
    await page.screenshot({ path: 'screenshot2.png' });
});
test('authorizationWithWrongPassword', async ({ page }) => {
    await page.goto('https://netology.ru/');
    await Promise.all([
        page.waitForURL('https://netology.ru/?modal=sign_in'),
        page.click('text=Войти')
    ]);
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(user.email);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(user.wrongPassword);
    await Promise.all([
        page.locator('[data-testid="login-submit-btn"]').click()
    ]);
    await page.waitForSelector('[data-testid="login-error-hint"]');
    await page.screenshot({ path: 'screenshot3.png' });
});
