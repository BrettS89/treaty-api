// Initializes the `insurance/timeline` service on path `/insurance/timeline`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Timeline } from './timeline.class';
import createModel from '../../../models/timeline.model';
import hooks from './hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/timeline': Timeline & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/timeline', new Timeline(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/timeline');

  service.hooks(hooks);
}
