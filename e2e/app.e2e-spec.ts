import { HgPage } from './app.po';

describe('ngtest App', function() {
  let page: HgPage;

  beforeEach(() => {
    page = new HgPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('hokiegeek.net/tea');
    // expect(page.getParagraphText()).toEqual('hokiegeek.net/tea');
  });
});
