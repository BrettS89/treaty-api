import { HookContext } from '@feathersjs/feathers';
import { ajv } from '@/utilities';

export const validate = (schema: string) => {
  return (context: HookContext): HookContext => {
    const { app } = context;

    const foundSchema = app.schema(schema);

    if (!foundSchema) throw new Error('No schema was found');

    const doValidation = ajv.compile(foundSchema);

    const valid = doValidation(context.data);
    console.log(doValidation.errors);

    if (valid) return context;

    throw new Error('Validation failed');
  };
};
