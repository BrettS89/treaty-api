import { fastJoin, disallow } from 'feathers-hooks-common';
import { authentication, authorization, validate } from '@/hooks';
import { hashPassword } from './hooks';
import resolvers from '@/services/security/user/resolvers';

export default {
  before: {
    all: [],
    find: [
      authentication,
      authorization({
        broker: { user_id: true },
        purchaser: { user_id: true },
      })
    ],
    get: [authentication],
    create: [
      validate('service.security.user.action.create'),
      hashPassword
    ],
    update: [disallow()],
    patch: [
      authentication,
      validate('service.security.user.action.patch'),
      authorization({
        broker: { user_id: true },
        purchaser: { user_id: true },
      })
    ],
    remove: [
      authentication,
      authorization({
        broker: { $deny: true },
        purchaser: { $deny: true },
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
