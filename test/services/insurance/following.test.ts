import app from '../../../src/app';

describe('\'insurance/following\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/following');
    expect(service).toBeTruthy();
  });
});
