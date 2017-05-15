import { PaygousersfrontPage } from './app.po';

describe('paygousersfront App', () => {
  let page: PaygousersfrontPage;

  beforeEach(() => {
    page = new PaygousersfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
