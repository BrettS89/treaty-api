import { disallow, fastJoin } from 'feathers-hooks-common';
import { authentication, authorization, validate } from '@/hooks';
import resolvers from './resolvers';

export default {
  before: {
    all: [authentication],
    find: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
    ],
    get: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
    ],
    create: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
    ],
    update: [disallow()],
    patch: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
    ],
    remove: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
    ]
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
