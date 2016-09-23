import { ExperienceBetterPage } from './app.po';

describe('experience-better App', function() {
    let page : ExperienceBetterPage;

    beforeEach(() => {
        page = new ExperienceBetterPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
