import { Hook, HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    deal: (...args: any) => async (access: Record<string, any>, { app }: HookContext) => {
      access.deal = (
        await app.service('insurance/deal').get(access.deal_id, {
          internal: true,
          query: { $resolve: { details: true, user: true } }
        })
      );
    },
    account: (...args: any) => async (access: Record<string, any>, { app }: HookContext) => {
      access.account = (
        await app.service('security/account').get(access.account_id, {
          internal: true,
        })
      );
    }
  }
};

export default resolvers;
