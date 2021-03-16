import { HookContext } from '@feathersjs/feathers';

export const formatDeal = (context: HookContext): HookContext => {
  let { result } = context;

  if (Array.isArray(result)) {
    result = result.map(access => {
      return access.deal
        ? access.deal
        : access;
    });
  } else {
    result.data = result.data.map(access => {
      return access.deal
      ? access.deal
      : access;
    });
  }
  return context;
};
