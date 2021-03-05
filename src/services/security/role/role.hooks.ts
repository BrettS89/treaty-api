import { disallow } from 'feathers-hooks-common';
import { authentication, authorization, validate } from '@/hooks';

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
    create: [validate('service.security.role.action.create')],
    update: [disallow()],
    patch: [validate('service.security.role.action.patch')],
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
