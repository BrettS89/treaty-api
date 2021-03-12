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
    get: [],
    create: [
      validate('service.insurance.deal.action.create'),
      authorization({
        broker: { account_id: true, user_id: true },
        reinsurer: { $deny: true },
      })
    ],
    update: [disallow()],
    patch: [
      validate('service.insurance.deal.action.patch'),
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true, account_id: true }
      })
    ],
    remove: [
      authorization({
        reinsurer: { $deny: true },
        broker: { user_id: true, account_id: true }
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
