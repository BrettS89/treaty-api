import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    role: (...args: any) => async (user: Record<string, any>, { app }: HookContext) => {
      user.role = (
        await app.service('security/role').get(user.role_id, { internal: true })
      );
    },
    account: (...args: any) => async (user: Record<string, any>, { app }: HookContext) => {
      user.account = (
        await app.service('security/account').get(user.account_id, { internal: true })
      );
    }, 
  }
};

export default resolvers;
