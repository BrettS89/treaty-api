import id from './id.json';
import resource from './resource';

const schemas: Record<string, any>[] = [
  id,
  ...resource,
];

export default schemas;

