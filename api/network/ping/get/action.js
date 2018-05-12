'use strict'

const Network = require('../../../../model/network')
import { Api } from '../../../../lib/response'
const credentials = require('../credentials.json')
const constants = {
  // resources
  STAGE: process.env.STAGE,
  PROFILE: process.env.PROFILE
}

// Multi - Create''
export function respond (event, cb) {

  let cred = {}
  cred['metadata'] = credentials[constants.PROFILE]['hyperledger']['metadata']
  cred['connection'] = credentials[constants.PROFILE]['hyperledger']['connection']

  let network = new Network(cred)
  network.ping().then(result => {
    return cb(null, Api.response(result))
  }).catch(err => {
    return cb(null, Api.errors(200, {5: err['message']}))
  })
}

