import { Driver } from '../../../../webdriver/driver';

class GetEncryptionKeyConfirmation {
  constructor(private driver: Driver) {}

  private accountBalanceValue = '.request-encryption-public-key__balance-value';

  private getEncryptionKeyConfirmationTitle = {
    text: 'Request encryption public key',
    css: '.request-encryption-public-key__header__text',
  };

  private provideEncryptionKeyButton = {
    text: 'Provide',
    tag: 'button',
  };

  async check_pageIsLoaded(): Promise<void> {
    try {
      await this.driver.waitForMultipleSelectors([
        this.getEncryptionKeyConfirmationTitle,
        this.provideEncryptionKeyButton,
      ]);
      console.log(`Get encryption key confirmation page is loaded`);
    } catch (e) {
      console.log(
        `Timeout while waiting for get encryption key confirmation page to be loaded`,
        e,
      );
      throw e;
    }
  }

  async clickToConfirmProvideEncryptionKey(): Promise<void> {
    console.log(
      'Click to confirm provide encryption key on get encryption key confirmation page',
    );
    await this.driver.clickElementAndWaitForWindowToClose(this.provideEncryptionKeyButton);
  }

  async check_accountBalance(balanceValue: string): Promise<void> {
    console.log('Check account balance on get encryption key confirmation screen:', balanceValue);
    await this.driver.waitForSelector({ css: this.accountBalanceValue, text: balanceValue });
  }
}

export default GetEncryptionKeyConfirmation;
