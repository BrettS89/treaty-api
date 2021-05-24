import app from '../../../src/app';

describe('\'insurance/document\' service', () => {
  it('registered the service', () => {
    const service = app.service('insurance/document');
    expect(service).toBeTruthy();
  });
});
