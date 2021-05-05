import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    markets: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.market_list = (
          await (async () => {
            return Promise.all(resource.markets.map(async m => {
              return {
                ...m,
                account: await app.service('security/account').get(m.account_id, { internal: true })
              };
            }));
          })()
      );
    },
  }
};

export default resolvers;
