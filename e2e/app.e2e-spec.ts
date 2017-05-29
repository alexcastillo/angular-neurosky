import { AngularNeuroskyPage } from './app.po';

describe('angular-neurosky App', () => {
  let page: AngularNeuroskyPage;

  beforeEach(() => {
    page = new AngularNeuroskyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
