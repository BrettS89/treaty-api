// Initializes the `insurance/market-list` service on path `/insurance/market-list`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { MarketList } from './market-list.class';
import createModel from '../../../models/market-list.model';
import hooks from './market-list.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/market-list': MarketList & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/market-list', new MarketList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/market-list');

  service.hooks(hooks);
}
