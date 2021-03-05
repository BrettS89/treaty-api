import { HookContext } from '@feathersjs/feathers';
import { NotAuthenticated, NotFound } from '@feathersjs/errors';
import jwt from 'jsonwebtoken';

export const authentication = async (context: HookContext): Promise<HookContext> => {
  const { app, params } = context;
  const token = params?.headers?.authorization;

  if (params.internal) return context;

  if (!token) {
    throw new NotAuthenticated('Missing token');
  }

  try {
    jwt.verify(token, app.get('jwtSecret'));
  } catch (e) {
    const error = e.toString().split(' ')[2];

    if (error === 'signature') {
      throw new NotAuthenticated('Invalid token');
    }
  }

  const decodedUser = jwt.decode(token);

  if (!decodedUser || typeof decodedUser === 'string') {
    throw new NotAuthenticated('Invalid token');
  }

  const user = await app
    .service('security/user')
    .get(decodedUser._id, {
      query: {
        $resolve: {
          role: true,
        },
      },
    });

  if (!user) throw new NotFound('No user found with this id');

  context.params.user = user;

  return context;
};
