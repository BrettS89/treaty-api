// Initializes the `insurance/following` service on path `/insurance/following`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Following } from './following.class';
import createModel from '../../../models/following.model';
import hooks from './hooks';
import schemas from './schemas';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/following': Following & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/following', new Following(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/following');

  app.schema(schemas);

  service.hooks(hooks);
}
