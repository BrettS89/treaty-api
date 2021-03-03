// Initializes the `insurance/market` service on path `/insurance/market`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Market } from './market.class';
import createModel from '../../../models/market.model';
import hooks from './market.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/market': Market & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/market', new Market(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/market');

  service.hooks(hooks);
}
