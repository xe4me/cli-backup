import { browser, element, by } from 'protractor/globals';

export class ExperienceBett3rPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
