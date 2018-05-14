'use strict'

const Network = require('../../../../model/network')
import { Api } from '../../../../lib/response'
var ncp = require('ncp').ncp;

// Multi - Create''
export function respond (event, cb) {

  ncp.limit = 16;
  ncp('.composer', '/tmp/.composer', function (err) {
    if (err) {
      return cb(null, Api.errors(200, {5: err['message']}))
    }
    console.log('done!');
    let network = new Network()
    network.ping().then(result => {
      return cb(null, Api.response(result))
    }).catch(err => {
      return cb(null, Api.errors(200, {5: err['message']}))
    })
  });
}

