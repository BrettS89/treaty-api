import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    details: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.details = (
        (await app.service('insurance/detail').find({
          query: {
            _id: { $in: resource.detail_ids },
          },
          internal: true,
          paginate: false,
        })) ?? []
      );
    },
    user: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.user = (
        await app.service('security/user').get(resource.user_id, {
          internal: true,
          query: { $resolve: { account: true }
        }})
      )
    },
  }
};

export default resolvers;
