import { disallow } from 'feathers-hooks-common';
import { authentication, authorization } from '@/hooks';

export default {
  before: {
    all: [
      authentication,
      authorization({
        broker: { $deny: true },
        purchaser: { $deny: true },
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [],
    remove: []
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
