import { disallow, fastJoin } from 'feathers-hooks-common';
import { authentication, authorization } from '@/hooks';
import resolvers from './resolvers';

export default {
  before: {
    all: [authentication],
    find: [],
    get: [disallow()],
    create: [
      authorization({
        broker: { account_id: true, user_id: true },
        reinsurer: { account_id: true, user_id: true },
    })
  ],
    update: [disallow()],
    patch: [
      authorization({
        broker: { account_id: true, user_id: true },
        reinsurer: { account_id: true, user_id: true },
    })],
    remove: [
      authorization({
        broker: { account_id: true, user_id: true },
        reinsurer: { account_id: true, user_id: true },
    })],
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
