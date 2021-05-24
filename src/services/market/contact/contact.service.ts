// Initializes the `market/contact` service on path `/market/contact`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Contact } from './contact.class';
import createModel from '../../../models/contact.model';
import hooks from './contact.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'market/contact': Contact & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/market/contact', new Contact(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('market/contact');

  service.hooks(hooks);
}
