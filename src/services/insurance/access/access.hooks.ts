import { fastJoin } from 'feathers-hooks-common';
import resolvers from './resolvers';
import { authentication, authorization } from '@/hooks';

export default {
  before: {
    all: [authentication],
    find: [
      authorization({
        broker: { user_id: true },
        purchaser: { account_id: true },
      })
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(resolvers, ctx => ctx.params.resolve || {})],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
