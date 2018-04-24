import { HgPage } from './app.po';

describe('HgTea App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('hokiegeek.net/tea');
    // expect(page.getParagraphText()).toEqual('hokiegeek.net/tea');
  });
});
