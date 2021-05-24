// Initializes the `insurance/detail` service on path `/insurance/detail`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Detail } from './detail.class';
import createModel from '../../../models/detail.model';
import hooks from './detail.hooks';
import schemas from './schemas';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'insurance/detail': Detail & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/insurance/detail', new Detail(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('insurance/detail');

  app.schema(schemas);

  service.hooks(hooks);
}
