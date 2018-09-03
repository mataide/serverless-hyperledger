'use strict'
const {
  Network
} = require('../../../../packages/composer-serverless')
import { Api } from '../../../../lib/response'
const { get } = require('lodash')


export async function respond (connection, event, cb) {
  try {
    const network = new Network(connection)
    const result = await network.ping()
    return cb(null, Api.response(result))
  } catch (err) {
    const message = get(err, '0.message', err.message)
    return cb(null, Api.errors(200, { 5: message }))
  }
}
