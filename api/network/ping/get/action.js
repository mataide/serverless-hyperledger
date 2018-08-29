'use strict'

const {
  Connection,
  Network
} = require('../../../../packages/composer-serverless')
import { Api } from '../../../../lib/response'
const promisify = require('util').promisify;
var ncp = promisify(require('ncp').ncp);
const { get } = require('lodash')

const { getInstance } = Connection
export async function respond (event, cb) {
  try {
    ncp.limit = 16;
    await ncp('.composer', '/tmp/.composer')
    const instance = await getInstance('network', 'cardname')
    const network = new Network(instance)
    const result = await network.ping()
    return cb(null, Api.response(result))
  } catch (err) {
    const message = get(err, '0.message', err.message)
    return cb(null, Api.errors(200, { 5: message }))
  }
}
