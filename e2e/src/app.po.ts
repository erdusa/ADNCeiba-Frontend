import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return browser.getTitle() as Promise<string>;
  }

  getText(elemento: string) {
    return element(by.css(elemento)).getText() as Promise<string>;
  }

  getElement(elemento: string) {
    return element(by.css(elemento));
  }
}
