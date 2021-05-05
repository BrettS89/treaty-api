import app from '../../../src/app';

describe('\'insurance/market-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/market-list');
    expect(service).toBeTruthy();
  });
});
