import { HookContext } from '@feathersjs/feathers';

export const formatDeal = (context: HookContext): HookContext => {
  let { result } = context;

  if (Array.isArray(result)) {
    result = result.map(record => {
      return record.deal
        ? record.deal
        : record;
    });
  } else {
    result.data = result.data.map(record => {
      return record.deal
      ? record.deal
      : record;
    });
  }
  return context;
};
