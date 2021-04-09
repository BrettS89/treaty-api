import { HookContext } from '@feathersjs/feathers';
import { Forbidden, BadRequest } from '@feathersjs/errors'

export const addFieldsOnCreate = async (context: HookContext): Promise<HookContext> => {
  const { app, data, params: { user } } = context;
  data.user_id = user?._id;
  
  const access = (await app.service('insurance/access').find({
    query: {
      account_id: user?.account_id,
      deal_id: data.deal_id,
    },
    internal: true,
    paginate: false,
  }))[0];

  if (!access) throw new Forbidden('Unauthorized');

  data.access_id = access._id;

  return context;
};
