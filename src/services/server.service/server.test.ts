import Server from './index';

afterEach(() => {
  Server.instance?.close();
});

describe('Server', () => {
  it('running', function () {
    Server.run(config => {
      expect(config).toBeDefined();
    });
    Server.init().run(config => {
      expect(config).toBeDefined();
    });
  });
});
