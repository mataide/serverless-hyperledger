'use strict'

const {
  Transaction
} = require('../../../../packages/composer-serverless')
import { Api } from '../../../../lib/response'

// Multi - Create''
export async function respond(connection, event, cb) {

  try {
    const data = JSON.parse(event.body)
    const TransactionType = 'CreateWallet'
    const transaction = new Transaction(connection)
    const result = await transaction.submit(data, TransactionType)
    return cb(null, Api.response(result))
  } catch (err) {
    return cb(null, Api.errors(200, {
      5: err['message']
    }))
  }
}

