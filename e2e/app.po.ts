import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('title')).getText();
  }

  getParagraphText() {
    return element(by.css('hg-tea h1')).getText();
  }
}
