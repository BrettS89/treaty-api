import app from '../../../src/app';

describe('\'market/note\' service', () => {
  it('registered the service', () => {
    const service = app.service('market/note');
    expect(service).toBeTruthy();
  });
});
