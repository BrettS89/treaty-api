import { disallow, fastJoin } from 'feathers-hooks-common';
import { authentication, authorization, formatDeal } from '@/hooks';
import { addFieldsOnCreate } from './hooks';
import resolvers from '@/services/insurance/following/resolvers';

export default {
  before: {
    all: [authentication],
    find: [
      authorization({
        broker: { $deny: true },
        reinsurer: { user_id: true },
      }),
    ],
    get: [
      authorization({
        broker: { $access: false },
        reinsurer: { user_id: true },
      }),
    ],
    create: [
      authorization({
        broker: { $deny: true },
      }),
      addFieldsOnCreate,
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [
      authorization({
        broker: { $deny: true },
        reinsurer: { user_id: true },
      }),
    ]
  },

  after: {
    all: [fastJoin(resolvers, ctx => ctx.params.resolve || {})],
    find: [formatDeal],
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
