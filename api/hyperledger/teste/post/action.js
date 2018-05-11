'use strict'

import { Api } from '../../../../lib/response'
const Match = require('../../../../model/match')
// const Util = require('../../../lib/util')

// Multi - Create''
export function respond (event, cb) {

  const data = JSON.parse(JSON.stringify(event.body))

  // if (Util.isEmpty(data['userId'])) {
  //   return cb(null, Api.errors(401, 'userId is Missing.'))
  // } else if (Util.isEmpty(data['roomId'])) {
  //   return cb(null, Api.errors(401, 'roomId is Missing.'))
  // }
  //
  // data['status'] = true

  Match.registerRoom(data).then(data => {
    return cb(null, Api.response(data))
  }).catch(err => {
    return cb(null, Api.errors(200, {5: err['message']}))
  })
}

