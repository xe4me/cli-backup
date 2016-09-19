import { ExperienceBuybackPage } from './app.po';

describe('experience-buyback App', function() {
  let page: ExperienceBuybackPage;

  beforeEach(() => {
    page = new ExperienceBuybackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
