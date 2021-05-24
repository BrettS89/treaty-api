import app from '../../../src/app';

describe('\'insurance/deal\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/deal');
    expect(service).toBeTruthy();
  });
});
