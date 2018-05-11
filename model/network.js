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

// This is a simple sample that will demonstrate how to use the
// API connecting to a HyperLedger Blockchain Fabric
//
// The scenario here is using a simple model of a participant of 'Student'
// and a 'Test' and 'Result'  assets.

'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const IdCard = require('composer-common').IdCard;

const credentials = require('../credentials.json')
const constants = {
  // resources
  STAGE: process.env.STAGE,
  PROFILE: process.env.PROFILE
}

/** Class for the Match*/
class Network {

  /**
   * Need to have the mapping from bizNetwork name to the URLs to connect to.
   * bizNetwork nawme will be able to be used by Composer to get the suitable model files.
   *
   */
  constructor() {
    this.bizNetworkConnection = new BusinessNetworkConnection();
    this.adminConnection = new AdminConnection();
    this.businessNetworkCardStore = new BusinessNetworkCardStore();
  }

  /**
   * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async ping() {

    const idCardData = new IdCard(credentials[constants.PROFILE]['hyperledger']['metadata'], credentials[constants.PROFILE]['hyperledger']['connection']);

    const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);
    try{
      const imported = await this.adminConnection.importCard(idCardName, idCardData);
      if (imported) {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(idCardName);
        if (!this.businessNetworkDefinition) {
          console.log("Error in network connection");
          throw "Error in network connection";
        }
        let result = await this.businessNetworkDefinition.ping();
        return result
      } else {
        console.log('null');
        throw "Error in importing card";
      }
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  static async ping() {
    let network = new Network();
    let results = await network.ping();
    return results
  }


}
module.exports = Network;
