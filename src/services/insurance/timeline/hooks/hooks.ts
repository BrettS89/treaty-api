import { HookContext } from '@feathersjs/feathers';
import timelineData from '@/utilities/timeline-data.json';

export const populateInitialData = (context: HookContext): HookContext => {  
  context.data = {
    ...context.data,
    ...timelineData,
  };
  
  return context;
};
