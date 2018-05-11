'use strict'

const Network = require('../../../../model/network')
import { Api } from '../../../../lib/response'

// Multi - Create''
export function respond (event, cb) {

  Network.ping().then(result => {
    return cb(null, Api.response(result))
  }).catch(err => {
    return cb(null, Api.errors(200, {5: err['message']}))
  })
}

