import { Application } from '@/declarations';
import { ajv } from '@/utilities';
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import upperFirst from 'lodash/upperFirst'

declare module '@feathersjs/feathers' {
  interface Application {
    schema: ((schema: string) => Record<string, any> | undefined ) & ((schema: Record<string, any>[]) => void)
  }
}

const schemas = (app: Application) => {
  app.schema = (schema: string | Record<string, any>[]) => {
    if (typeof schema === 'string') {
      return app.get(`system.schema.${schema}`)
    }

    const set = schema
      .filter(s => [
        typeof s === 'object',
        typeof s.$id === 'string',
        s.$id.startsWith('/system/schema/'),
      ].every(Boolean))
      .map(s => {
        const title = s.$id
          .replace('/system/schema/', '')
          .split('.')
          .map(upperFirst)
          .join('.')

        const key = s.$id.replace('/system/schema/', 'system.schema.')

        app.set(key, s)
        ajv.addSchema(s, key);

        return {
          title,
          $ref: s.$id,
        }
      })

    const current = app.get('system.schema') ?? []
    const updated = uniqBy([...current, ...set], '$ref')
    const sorted = sortBy(updated, 'title')

    app.set('system.schema', sorted)
  }
}

export default schemas;
