// Initializes the `insurance/deal` service on path `/insurance/deal`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Deal } from './deal.class';
import createModel from '../../../models/deal.model';
import hooks from './deal.hooks';
import schemas from './schemas';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/deal': Deal & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/deal', new Deal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/deal');

  app.schema(schemas);

  service.hooks(hooks);
}
