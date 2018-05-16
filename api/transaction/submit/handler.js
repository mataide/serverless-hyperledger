'use strict'
import * as post from './transaction/action'

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Logic
export default (event, context) => {
  let behavior = event.requestContext.httpMethod
  switch (behavior) {
    case 'POST':
      return post.respond(event, (error, response) => {
        return context.done(error, response)
      })
  }
}
