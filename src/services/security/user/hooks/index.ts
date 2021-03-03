import { fastJoin } from 'feathers-hooks-common';
import { hashPassword } from './hooks';
import resolvers from '@/services/security/user/resolvers';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword],
    update: [],
    patch: [],
    remove: []
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
