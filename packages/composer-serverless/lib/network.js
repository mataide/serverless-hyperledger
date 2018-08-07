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

// This is a model to Network Actions

'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const constants = {
  // resources
  NETWORK: process.env.NETWORK,
  CARDNAME: process.env.CARDNAME,
  LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT
}

/** Class for the Network*/
class Network {

  /**
   * Need to have the mapping from bizNetwork name to the URLs to connect to.
   * bizNetwork nawme will be able to be used by Composer to get the suitable model files.
   *
   */
  constructor(network, cardname) {
    let connectionOptions = {}
    if(constants.LAMBDA_TASK_ROOT) {
      connectionOptions = {
        wallet : {
          type: 'composer-wallet-serverless',
          options : {
            storePath : '.composer'
          }
        }
      };
    } else {
      connectionOptions = {
        wallet : {
          type: 'composer-wallet-serverless',
          options : {
            storePath : process.cwd() + '/.composer'
          }
        }
      };
    }
    this.bizNetworkConnection = new BusinessNetworkConnection(connectionOptions);

    this.network = network

    if(constants.NETWORK) {
      this.network = constants.NETWORK
    }

    if (typeof this.network === 'undefined') {
      throw new Error('network is undefined');
    }

    this.cardname = cardname

    if(constants.CARDNAME) {
      this.cardname = constants.CARDNAME
    }

    if (typeof this.cardname === 'undefined') {
      throw new Error('cardname is undefined');
    }
  }

  /**
   * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async ping() {
    try{
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(this.cardname);
        if (!this.businessNetworkDefinition) {
          console.log("Error in network connection");
          throw "Error in network connection";
        }
        return await this.bizNetworkConnection.ping();
    }catch(error){
      console.log(error);
      throw error;
    }
  }

}
module.exports = Network;
