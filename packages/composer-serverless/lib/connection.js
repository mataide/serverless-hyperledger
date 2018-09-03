/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const { join } = require('path')
const { promisify } = require('util')
const { ncp } = require('ncp')
const ncpPromise = promisify(ncp);
const { merge } = require('lodash')
const { BusinessNetworkConnection } = require('composer-client')
const COMPOSER_OPTS = {
  development: join(process.cwd(), '.composer'),
  production: '/tmp/.composer'
}
const DEFAULT_OPTS = {
  NETWORK: process.env.NETWORK,
  CARDNAME: process.env.CARDNAME,
  LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
  CONNECTION: {
    wallet: {
      type: 'composer-wallet-filesystem',
      options: {
        storePath: COMPOSER_OPTS.production
      }
    }
  }
}
const Repository = {
  context: null
}
/**
 * @name Connection
 * @description Connection class responsible to setup the connection with hyperledger
 */
class Connection {
  constructor (network, cardname) {
    const options = this._getOptionsByEnvironment();
    this.bizNetworkConnection = new BusinessNetworkConnection(options);
    this.network = network
    this.cardname = cardname
    this._doAllChecks();
  }

  static getInstance () {
    console.log('Try to get static instance')
    if (Repository.context) {
      return Repository.context
    }
    console.log('Create a new instance')
    return new Connection()
  }

  async isReady () {
    return new Promise((resolve) => {
      let i = 1
      const doCheck = () => {
        setTimeout(() => {
          if (!Repository.context) {
            return doCheck()
          }
          return resolve()
        }, 100)
      }
      return doCheck()
    })
  }

  _getOptionsByEnvironment () {
    if (DEFAULT_OPTS.LAMBDA_TASK_ROOT) {
      return DEFAULT_OPTS.CONNECTION
    }
    return merge({}, DEFAULT_OPTS.CONNECTION, {
      wallet: {
        options: {
          storePath: join(process.cwd(), '.composer')
        }
      }
    })
  }

  async _doAllChecks () {
    if (!this.network) {
      throw new Error('[network] is required')
    }
    if (!this.cardname) {
      throw new Error('[cardname] is required')
    }
    await this._moveCredentials()
    await this._establishConnection()
    Repository.context = this
  }

  async _moveCredentials () {
    if (!DEFAULT_OPTS.LAMBDA_TASK_ROOT) {
      return
    }
    await await ncpPromise(COMPOSER_OPTS.development, COMPOSER_OPTS.production)
  } 

  async _establishConnection () {
    console.log('[_establishConnection] STARTED')
    this.businessNetworkDefinition = await this.bizNetworkConnection.connect(this.cardname)
    console.log('[_establishConnection] FINISHED')
  }

  set network (value) {
    if (DEFAULT_OPTS.NETWORK) {
      return this._network = DEFAULT_OPTS.NETWORK
    }
    return this._network = value
  }

  set cardname (value) {
    if (DEFAULT_OPTS.CARDNAME) {
      return this._cardname = DEFAULT_OPTS.CARDNAME
    }
    return this._cardname = value
  }

  get network () {
    return this._network
  }

  get cardname () {
    return this._cardname
  }
}



/**
 * @description Connection Factory or singleton
 */
module.exports = {
  counter: 0,
  create (...args){
    return new Connection(...args)
  },
  getInstance (...args) {
    return Connection.getInstance(...args)
  }
}
