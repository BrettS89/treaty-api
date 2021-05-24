// Initializes the `storage/s3` service on path `/storage/s3`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { S3 } from './s3.class';
import hooks from './s3.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'storage/s3': S3 & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use('/storage/s3', new S3(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('storage/s3');

  service.hooks(hooks);
}
