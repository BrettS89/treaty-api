// Initializes the `insurance/document` service on path `/insurance/document`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Document } from './document.class';
import createModel from '../../../models/document.model';
import hooks from './document.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/document': Document & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/document', new Document(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/document');

  service.hooks(hooks);
}
