import { disallow } from 'feathers-hooks-common';
import { authentication, authorization } from '@/hooks';

export default {
  before: {
    all: [authentication],
    find: [
      authorization({
        purchaser: { $deny: true },
        broker: { user_id: true },
      })
    ],
    get: [],
    create: [
      authorization({
        broker: { account_id: true, user_id: true },
        purchaser: { $deny: true },
      })
    ],
    update: [disallow()],
    patch: [
      authorization({
        purchaser: { $deny: true },
        broker: { user_id: true, account_id: true }
      })
    ],
    remove: [
      authorization({
        purchaser: { $deny: true },
        broker: { user_id: true, account_id: true }
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
