// Initializes the `security/account` service on path `/security/account`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Account } from './account.class';
import createModel from '../../../models/account.model';
import hooks from './account.hooks';
import schemas from './schemas';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'security/account': Account & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/security/account', new Account(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('security/account');

  app.schema(schemas);

  service.hooks(hooks);
}
