import app from '../../../src/app';

describe('\'insurance/message\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/message');
    expect(service).toBeTruthy();
  });
});
