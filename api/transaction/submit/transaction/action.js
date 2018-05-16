'use strict'

const Transaction = require('../../../../packages/composer-serverless/lib/transaction')
import { Api } from '../../../../lib/response'
var ncp = require('ncp').ncp;

// Multi - Create''
export function respond (event, cb) {

  const data = JSON.parse(event.body)

  ncp.limit = 16;
  ncp('.composer', '/tmp/.composer', function (err) {
    if (err) {
      return cb(null, Api.errors(200, {5: err['message']}))
    }
    console.log('done!');
    let transaction = new Transaction()
    transaction.submit(data, 'CreateWallet').then(result => {
      return cb(null, Api.response(result))
    }).catch(err => {
      return cb(null, Api.errors(200, {5: err['message']}))
    })
  });
}

