import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    deal: (...args: any) => async (following: Record<string, any>, { app }: HookContext) => {
      following.deal = (
        await app.service('insurance/deal').get(following.deal_id, {
          internal: true,
          query: { $resolve: { details: true, user: true } }
        })
      );
    },
  }
};

export default resolvers;
