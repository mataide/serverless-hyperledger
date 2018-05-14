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

// these are the credentials to use to connect to the Hyperledger Fabric
let cardname = 'admin@proak-hyperledger-network';

const NS = 'com.emastersapp';

/** Class for the Match*/
class Match {

  /**
   * Need to have the mapping from bizNetwork name to the URLs to connect to.
   * bizNetwork nawme will be able to be used by Composer to get the suitable model files.
   *
   */
  constructor(cardName) {
    this.bizNetworkConnection = new BusinessNetworkConnection();
    this.adminConnection = new AdminConnection();
    this.businessNetworkCardStore = new BusinessNetworkCardStore();
  }

  /**
   * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async init() {
    // console.log(credentials[constants.PROFILE]['hyperledger']['metadata'])
    // console.log(credentials[constants.PROFILE]['hyperledger']['connection'])

    const idCardData = new IdCard(credentials[constants.PROFILE]['hyperledger']['metadata'], credentials[constants.PROFILE]['hyperledger']['connection']);

    // const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);
    try{
      // const imported = await this.adminConnection.importCard(idCardName, idCardData);
      // if (imported) {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(`admin@proak-hyperledger-network`);
        if (!this.businessNetworkDefinition) {
          console.log("Error in network connection");
          throw "Error in network connection";
        }
        return this.businessNetworkDefinition;
      // } else {
      //   console.log('null');
      //   throw "Error in importing card";
      // }
    }catch(error){
      console.log(error);
      throw error;
    }
    //this.businessNetworkDefinition = await this.bizNetworkConnection.connect(`admin@proak-hyperledger-network`);
    //console.log('LandRegistry:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
  }

  /**
   * Updates a fixes asset for selling..
   * @return {Promise} resolved when this update has completed
   */
  async registerRoom(room) {
    const METHOD = 'RegisterNewSitnGo';
    let factory        = this.businessNetworkDefinition.getFactory();
    let transaction    = factory.newTransaction(NS,'RegisterNewSitnGo');
    transaction.game = room.game
    transaction.mode = room.mode
    transaction.gameType = room.gameType
    transaction.stake = room.stake
    transaction.money = room.money
    transaction.stakeValue = room.stakeValue
    transaction.buyin = room.buyin
    transaction.rake = room.rake
    transaction.maxPlayers = room.maxPlayers
    transaction.maxWatchers = room.maxWatchers
    transaction.gameId = room.gameId
    transaction.region = room.region

    console.log(METHOD, 'Submitting transaction');
    await this.bizNetworkConnection.submitTransaction(transaction);
  }

  /**
   * @description - run the listtiles command
   * @param {Object} args passed from the command line
   * @return {Promise} resolved when the action is complete
   */
  static async registerRoom(json) {
    let match = new Match('admin');
    await match.init();
    let results = await match.registerRoom(json);
    console.log('Transaction Submitted');
    console.log(results);
  }
}
module.exports = Match;
