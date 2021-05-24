import { HookContext } from '@feathersjs/feathers'

export const setInternal = (context: HookContext): HookContext => {
  context.params.internal = false;
  return context
};
