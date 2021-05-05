import { HookContext } from '@feathersjs/feathers';

export const addAccess = async (context: HookContext): Promise<HookContext> => {
  const { app, data, id, params: { user }, result } = context;

  if (!Object.keys(data).includes('market_list_id')) return context;
  if (data.market_list_id === null) return context;
  
  const list = await app.service('insurance/market-list').get(result.market_list_id, { internal: true });
  
  await Promise.all(list.markets.map(m => {
    return app.service('insurance/access').create({
      account_id: m.account_id,
      user_id: user?._id,
      deal_id: id,
      active: true,
    }, { internal: true });
  }));
  console.log('hi');

  return context;
};

export const deleteAccess = async (context: HookContext): Promise<HookContext> => {
  const { app, data, id } = context;

  if (!data.market_list_id) return context;

  const access = await app.service('insurance/access').find({
    query: {
      deal_id: id,
    },
    internal: true,
    paginate: false,
  });

  await Promise.all(access.map(a => app.service('insurance/access').remove(a._id, { internal: true })));

  return context;
};

export const deleteNotes = async (context: HookContext): Promise<HookContext> => {
  const { app, data, id } = context;

  if (!data.market_list_id) return context;

  const notes = await app.service('market/note').find({
    query: {
      deal_id: id,
    },
    internal: true,
    paginate: false,
  });

  await Promise.all(notes.map(n => app.service('market/note').remove(n._id, { internal: true })));

  return context;
};
