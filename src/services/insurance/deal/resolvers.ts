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
    messages: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.messages = (
        await app.service('communication/message').find({
          query: {
            deal_id: resource._id,
            $resolve: { user: true },
          },
          internal: true,
          paginate: false,
        })
      );
    },
    access: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.access = (
        await app.service('insurance/access').find({
          query: {
            $limit: 1000,
            deal_id: resource._id,
            $resolve: { account: true }
          },
          internal: true,
          paginate: false,
        })
      )
    },
  }
};

export default resolvers;