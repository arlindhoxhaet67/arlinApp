import path from 'path';
import { chromium } from '@playwright/test';

const extensionPath = path.join(__dirname, '../../../../../dist/chrome');

export class ChromeExtensionPage {
  async initExtension() {
    const launchOptions = {
      headless: process.env.HEADLESS !== 'true',
      args: [`--disable-extensions-except=${extensionPath}`],
    };
    if (process.env.HEADLESS === 'true') {
      launchOptions.args.push('--headless=new');
    }
    const context = await chromium.launchPersistentContext('', launchOptions);
    const page = await context.newPage();
    await page.waitForSelector('text=/I agree to arlinApp/');
    return page;
  }
}
