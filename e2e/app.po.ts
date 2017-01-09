import {
    browser,
    element,
    by
} from 'protractor/globals';

export class ExperienceBett3rPage {
    public navigateTo() {
        return browser.get('/');
    }

    public getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}
