// Initializes the `insurance/access` service on path `/insurance/access`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Access } from './access.class';
import createModel from '../../../models/access.model';
import hooks from './access.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/access': Access & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/access', new Access(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/access');

  service.hooks(hooks);
}
