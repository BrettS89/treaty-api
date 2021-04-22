import { authentication, authorization, validate } from '@/hooks';

export default {
  before: {
    all: [authentication],
    find: [],
    get: [],
    create: [
      authorization({
        reinsurer: { $deny: true },
      })
    ],
    update: [],
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