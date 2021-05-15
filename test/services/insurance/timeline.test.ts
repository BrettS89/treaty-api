import app from '../../../src/app';

describe('\'insurance/timeline\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/timeline');
    expect(service).toBeTruthy();
  });
});
