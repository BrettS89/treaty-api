import app from '../../../src/app';

describe('\'insurance/access\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/access');
    expect(service).toBeTruthy();
  });
});
