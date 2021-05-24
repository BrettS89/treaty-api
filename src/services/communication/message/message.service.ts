// Initializes the `communication/message` service on path `/communication/message`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Message } from './message.class';
import createModel from '../../../models/message.model';
import hooks from './message.hooks';
import schemas from './schemas';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'communication/message': Message & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: {
      default: 10000,
      max: 10000,
    },
  };

  // Initialize our service with any options it requires
  app.use('/communication/message', new Message(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('communication/message');
  
  app.schema(schemas);

  service.hooks(hooks);
}
