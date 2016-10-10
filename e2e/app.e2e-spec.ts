import { ExperienceBett3rPage } from './app.po';

describe('experience-bett3r App', function() {
    let page : ExperienceBett3rPage;

    beforeEach(() => {
        page = new ExperienceBett3rPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
