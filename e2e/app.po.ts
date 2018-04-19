import { browser, element, by } from 'protractor';

export class HgPage {
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
