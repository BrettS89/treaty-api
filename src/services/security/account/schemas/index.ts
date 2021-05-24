import actions from './actions'
import attributes from './attributes.json'
import resource from './resource.json'

const schemas: Record<string, any >[] = [
  ...actions,
  attributes,
  resource,
];

export default schemas;

