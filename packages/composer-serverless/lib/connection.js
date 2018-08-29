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
const { merge } = require('lodash')

const mapConnections = new Map()

class BusinessNetworkConnection {
  async connect() {
    return new Promise((resolve) => {
      console.log('open connection')
      console.log(mapConnections)
      setTimeout(() => resolve({ name: 'connected' }), 5000)
    })
  }

  async ping () {
    return { name: 'pong' }
  }
}

// const { BusinessNetworkConnection } = require('composer-client')
const DEFAULT_OPTS = {
  NETWORK: process.env.NETWORK,
  CARDNAME: process.env.CARDNAME,
  LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
  CONNECTION: {
    wallet: {
      type: 'composer-wallet-filesystem',
      options: {
        storePath: `/tmp/.composer`
      }
    }
  }
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
    this._doAllChecks().catch(err => { throw err })
  }

  static async getInstance (network, cardname) {
    const instance = mapConnections.get(cardname)
    if (instance) {
      return instance
    }
    const connection = new Connection(network, cardname)
    mapConnections.set(cardname, connection)
    return connection
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
    await this._establishConnection()
  }

  async _establishConnection () {
    this.businessNetworkDefinition = await this.bizNetworkConnection.connect(this.cardname)
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
  create (...args){
    return new Connection(...args)
  },
  async getInstance (...args) {
    return Connection.getInstance(...args)
  }
}
