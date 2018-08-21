import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getButtonText() {
    return element(by.css('button#new-item-button')).getText();
  }
}
