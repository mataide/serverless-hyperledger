'use strict'
import * as get from './get/action'

import {
  Connection,
} from '../../../packages/composer-serverless'

const ConnectionInstance = Connection.getInstance()

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */
// Require Logic
export default async (event, context) => {
  let behavior = event.requestContext.httpMethod
  const cbFactory = (err, response) => {
    return context.done(err, response)
  }
  switch (behavior) {
    case 'GET':
      console.log('Wait connection')
      await ConnectionInstance.isReady()
      console.log('Wait connection done')
      return get.respond(ConnectionInstance, event, cbFactory)
  }
}
