import app from '../../../src/app';

describe('\'communication/message\' service', () => {
  it('registered the service', () => {
    const service = app.service('communication/message');
    expect(service).toBeTruthy();
  });
});
