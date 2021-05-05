import app from '../../../src/app';

describe('\'market/list\' service', () => {
  it('registered the service', () => {
    const service = app.service('market/list');
    expect(service).toBeTruthy();
  });
});
