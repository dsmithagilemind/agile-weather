const _importDynamic = new Function('modulePath', 'return import(modulePath)')

export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic('node-fetch')
  return fetch(...args)
}

import { RedwoodError } from '@redwoodjs/api'
import {
  createTransformerDirective,
  TransformerDirectiveFunc
} from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use @endpoint to transform the resolved value to return a modified result.
  """
  directive @endpoint(url: String) on FIELD_DEFINITION
`

/**
 * @see { @link https://github.com/redwoodjs/redwood-office-hours/blob/main/2022-09-28-rest-directive/api/src/directives/rest/rest.ts }
 */
const replaceUrlNamedParameters = (args, directiveArgs): string => {
  if (directiveArgs?.url) {
    let url = directiveArgs.url
    const params = [...directiveArgs.url.matchAll(/\/:(.+)/g)]

    params?.forEach((param) => {
      try {
        if (args[param[1]]) {
          logger.debug({ custom: { params, args } }, 'Replacing argument')
          url = url.replace(param[0], `/${args[param[1]]}`)
          logger.debug({ custom: { url } }, 'url')
        }
        else {
          logger.error(
            { custom: directiveArgs.url },
            'Missing required argument'
          )
          throw new RedwoodError('Missing required argument')
        }
      }
      catch (e) {
        logger.error(
          { custom: directiveArgs.url },
          'Could not replace argument'
        )
      }
    })

    return url
  }

  throw new RedwoodError('Missing required url')
}

const transform: TransformerDirectiveFunc = async ({ args, directiveArgs }) => {
  /**
   * Write your transformation logic inside this function.
   * Transformer directives run **after** resolving the value
   *
   * - You can also throw an error, if you want to stop executing, but note that the value has already been resolved
   * - Transformer directives **must** be synchronous, and return a value
   **/

  const url = replaceUrlNamedParameters(args, directiveArgs)

  try {
    logger.debug({ custom: url }, 'Fetching url ...')

    const res = await fetch(url)

    if (res.ok) {
      logger.debug({ custom: url }, 'Successfully fetched url')
      const json = await res.json()
      return json.data
    }
  }
  catch (e) {
    logger.error(e)
    logger.error({ custom: url, e }, 'Unable to fetch url')

    throw new RedwoodError('Unable to fetch url')
  }
}

const endpoint = createTransformerDirective(schema, transform)

export default endpoint
