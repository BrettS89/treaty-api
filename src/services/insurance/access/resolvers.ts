import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    deal: (...args: any) => async (access: Record<string, any>, { app }: HookContext) => {
      access.deal = (
        await app.service('insurance/deal').get(access.deal_id)
      );
    },
  }
};

export default resolvers;
