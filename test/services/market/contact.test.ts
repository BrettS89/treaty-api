import app from '../../../src/app';

describe('\'market/contact\' service', () => {
  it('registered the service', () => {
    const service = app.service('market/contact');
    expect(service).toBeTruthy();
  });
});
