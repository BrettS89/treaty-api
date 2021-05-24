import app from '../../../src/app';

describe('\'storage/s3\' service', () => {
  it('registered the service', () => {
    const service = app.service('storage/s3');
    expect(service).toBeTruthy();
  });
});
