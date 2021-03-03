import { HookContext } from '@feathersjs/feathers'
import { Forbidden, BadRequest } from '@feathersjs/errors'
import { cloneDeep } from 'lodash';

interface AuthHookParams {
  broker?: Record<string, boolean>;
  purchaser?: Record<string, boolean>;
}

const defaultParams = {
  broker: { $deny: false },
  purchaser: { $deny: false },
};

type AuthorizationHook = (authObj: AuthHookParams) => (context: HookContext) => HookContext;

export const authorization: AuthorizationHook = (authObj: AuthHookParams = defaultParams)=> {
  return (context: HookContext): HookContext => {
    let { params: { query, user } } = context;
    let role: string = user?.role?.name;

    if (role === 'superadmin') return context;

    if (role.includes('-admin')) {
      role = role.split('_')[0];
    }

    if (!user) throw new BadRequest();

    //@ts-ignore
    if (!authObj[role] || authObj[role].$deny) {
      throw new Forbidden();
    }

    //@ts-ignore
    query = populateQuery(authObj[role], query, user)

    return context;
  };
};

/* 
  populateQuery populates either _id or account_id if included in authObj for broker or purchaser
*/
const populateQuery = (
  fields: Record<string, boolean>,
  query: Record<string, any> | undefined,
  user: Record<string, any>
): Record<string, any> => {
  const fieldsClone = cloneDeep(fields);
  delete fieldsClone.$deny;

  //@ts-ignore
  const newQuery = Object.entries(fields).reduce((acc, [key, value]) => {
    if (value) {
      return {
        ...acc,
        [key]: key === 'user_id' ? user._id : user[key]
      }
    }
    return acc;
  }, cloneDeep(query || {}));

  return newQuery;
};
