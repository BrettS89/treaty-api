import app from '../../../src/app';

describe('\'insurance/market\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/market');
    expect(service).toBeTruthy();
  });
});
