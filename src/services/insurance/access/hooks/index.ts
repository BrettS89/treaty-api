import { disallow, fastJoin } from 'feathers-hooks-common';
import resolvers from '@/services/insurance/access/resolvers';
import { authentication, authorization, validate } from '@/hooks';
import { formatDeal } from './hooks';

export default {
  before: {
    all: [authentication],
    find: [
      authorization({
        broker: { user_id: true },
        reinsurer: { account_id: true },
      }),
      
    ],
    get: [],
    create: [
      validate('service.insurance.access.action.create'),
      authorization({
        broker: { user_id: true },
        reinsurer: { $deny: true },
      }),
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true },
      })
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
