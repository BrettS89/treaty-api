import app from '../../../src/app';

describe('\'insurance/detail\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/detail');
    expect(service).toBeTruthy();
  });
});
