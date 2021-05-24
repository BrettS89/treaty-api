import actions from './actions';
import attributes from './attributes.json';
import relations from './relations.json';
import resource from './resource.json';

const schemas: Record<string, any >[] = [
  ...actions,
  attributes,
  relations,
  resource,
]

export default schemas;
