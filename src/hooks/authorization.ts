import { HookContext } from '@feathersjs/feathers'
import { Forbidden, BadRequest } from '@feathersjs/errors'
import { cloneDeep } from 'lodash';

interface AuthHookParams {
  broker?: Record<string, boolean>;
  reinsurer?: Record<string, boolean>;
}

const defaultParams = {
  broker: { $deny: false },
  reinsurer: { $deny: false },
};

type AuthorizationHook =
  (authObj: AuthHookParams) => (context: HookContext) => Promise<HookContext>;

export const authorization: AuthorizationHook = (authObj: AuthHookParams = defaultParams)=> {
  return async (context: HookContext): Promise<HookContext> => {
    let { params: { internal, query, user } } = context;
    if (internal) return context;

    let role: string = user?.role?.name;
    if (role === 'superadmin') return context;
    if (!user) throw new Forbidden('Unauthorized');
    if (role.includes('-admin')) role = role.split('-')[0];
    if (!user) throw new BadRequest('Unauthorized');

    //@ts-ignore
    if (!authObj[role] || authObj[role].$deny) {
      throw new Forbidden('Unauthorized');
    }

    await checkResourceForPatchOrRemove(context, authObj[role]);
    checkBody(context, authObj[role]);

    //@ts-ignore
    query = populateQuery(authObj[role], query, user)

    return context;
  };
};

const populateQuery = (
  fields: Record<string, boolean>,
  query: Record<string, any> | undefined,
  user: Record<string, any>
): Record<string, any> => {
  const fieldsClone = cloneDeep(fields);
  delete fieldsClone.$deny;

  //@ts-ignore
  const newQuery = Object
    .entries(fields)
    .reduce((acc, [key, value]) => {
      if (value) {
        return {
          ...acc,
          [key]: key === 'user_id' 
            ? user._id
            : user[key]
        }
      }

      return acc;
    }, cloneDeep(query || {}));

  return newQuery;
};

const checkResourceForPatchOrRemove = async (
  context: HookContext,
  fields: Record<string, boolean>
): Promise<void> => {
  const { app, path, id, params: { user } } = context;

  if (context.method !== 'patch' ?? context.method !== 'remove') return;
  if (!user) throw new Forbidden();

  const resource = await app
    .service(path)
    .get(id, { internal: true });

  checkIsValid(resource, user, fields);
};

const checkBody = (
  context: HookContext,
  fields: Record<string, boolean>
): void => {
  const { params: { user }, data } = context;

  if (context.method !== 'create') return;
  if (!user) throw new Forbidden();

  checkIsValid(data, user, fields);
};

const checkIsValid = (
  data: Record<string, any>,
  user: Record<string, any>,
  fields: Record<string, boolean>
): void => {
  const status = Object.entries(fields).map(([key, value]) => {
    if (!value) return true;

    if (key === 'user_id') return data[key] === user._id.toString(); 
    return data[key].toString() === user[key].toString();
  });

  if (status.includes(false)) {
    throw new Forbidden('Unauthorized');
  }
};
