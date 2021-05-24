// Initializes the `market/note` service on path `/market/note`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Note } from './note.class';
import createModel from '../../../models/note.model';
import hooks from './note.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'market/note': Note & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: {
      default: 10000,
      max: 10000,
    },
  };

  // Initialize our service with any options it requires
  app.use('/market/note', new Note(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('market/note');

  service.hooks(hooks);
}
