import { disallow } from 'feathers-hooks-common';
import { authentication, authorization } from '@/hooks';
import { populateInitialData } from './hooks';

export default {
  before: {
    all: [
      authentication,
    ],
    find: [
      authorization({
        broker: { $deny: true },
        reinsurer: { $deny: true },
      }),
    ],
    get: [
      authorization({
        broker: { $deny: true },
        reinsurer: { $deny: true },
      }),
    ],
    create: [
      authorization({
        broker: { $deny: true },
        reinsurer: { $deny: true },
      }),
      populateInitialData,
    ],
    update: [disallow()],
    patch: [authorization({
      broker: { account_id: true },
      reinsurer: { $deny: true },
    }),
  ],
    remove: [
      authorization({
        broker: { $deny: true },
        reinsurer: { $deny: true },
      }),
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
