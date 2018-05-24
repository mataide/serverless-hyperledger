'use strict'

const Network = require('../../../../packages/composer-serverless/lib/network')
import { Api } from '../../../../lib/response'

// Multi - Create''
export function respond (event, cb) {

  let network = new Network()
  network.ping().then(result => {
    return cb(null, Api.response(result))
  }).catch(err => {
    return cb(null, Api.errors(200, {5: err['message']}))
  })
}

