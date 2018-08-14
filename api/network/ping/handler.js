'use strict'
import * as get from './get/action'
const fs = require('fs-extra')
// Sync:
try {
  fs.copySync('.composer', '/tmp/.composer')
  console.log('success!')
} catch (err) {
  console.error(err)
}
const Network = require('../../../packages/composer-serverless/lib/network')
const network = new Network()
let bizNetworkConnection;
network.connect().then(result => {
  bizNetworkConnection = result
})

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
    case 'GET':
      return get.respond(bizNetworkConnection, event, (error, response) => {
        return context.done(error, response)
      })
  }
}
