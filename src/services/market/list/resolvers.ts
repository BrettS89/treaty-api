import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    markets: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.market_list = (
          await (async () => {
            return Promise.all(resource.markets.map(async m => {
              return {
                ...m,
                account: await app.service('security/account').get(m.account_id, { internal: true }),
                contact: m.contact_id ? (await app.service('market/contact').get(m.contact_id, { internal: true }).catch(() => null)) : null,
                contacts: await app.service('market/contact').find({ query: { reinsurer_account_id: m.account_id }, internal: true, paginate: false, }),
              };
            }));
          })()
      );
    },
  }
};

export default resolvers;
