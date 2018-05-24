'use strict'

const Transaction = require('../../../../packages/composer-serverless/lib/transaction')
import { Api } from '../../../../lib/response'

// Multi - Create''
export function respond (event, cb) {

  const data = JSON.parse(event.body)

  let transaction = new Transaction()
  transaction.submit(data, 'CreateWallet').then(result => {
    return cb(null, Api.response(result))
  }).catch(err => {
    return cb(null, Api.errors(200, {5: err['message']}))
  })
}

