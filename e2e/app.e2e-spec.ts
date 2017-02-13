import { TodoAppStarterPage } from './app.po';

describe('todo-app-starter App', function() {
  let page: TodoAppStarterPage;

  beforeEach(() => {
    page = new TodoAppStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
