import { disallow } from 'feathers-hooks-common';
import { authentication, authorization, validate } from '@/hooks';

export default {
  before: {
    all: [authentication],
    find: [],
    get: [],
    create: [
      authorization({
        broker: { $deny: true },
        purchaser: { $deny: true },
      }),
      validate('service.security.account.action.create')
    ],
    update: [disallow()],
    patch: [
      authorization({
        broker: { account_id: true },
        purchaser: { account_id: true },
      }),
      validate('service.security.account.action.patch')
    ],
    remove: [
      authorization({
        broker: { $deny: true },
        purchaser: { $deny: true },
      })
    ]
  },

  after: {
    all: [],
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
