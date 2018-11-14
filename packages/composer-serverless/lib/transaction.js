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
// Require abstract core class to setup connection attributes
const AbstractCore = require('./core')
const { isPlainObject } = require('lodash')

/** 
 * @name Transaction
 * @description This is a model to Transaction Actions
 */
class Transaction extends AbstractCore {
  /**
   * @param {Connection} connection The singleton connection
   */
  constructor (connection) {
    super(connection)
  }

  /**
   * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async submit (data, method) {
    let factory = this.businessNetworkDefinition.getFactory();
    let transaction = factory.newTransaction(this.network, method);

    //For Concept Objects add Key Ex. {$concept: "<Asset Name>"}
    Object.entries(data).map((key, value) => {
      if(this.isObject(key[1])) {
        if(key[1].$concept) {
          let concept = factory.newConcept(this.network, key[1].$concept);
          delete key[1].$concept
          Object.assign(concept, key[1])
          data[key[0]] = concept
        }
      }
    });
    Object.assign(transaction, data)

    // For transactions, we submit the transaction for execution.
    // Ensure we return the generated identifier, so that LoopBack can return
    // the generated identifier back to the user.
    return this.bizNetworkConnection.submitTransaction(transaction)
      .then((response) => {

        // Return the response for returning transactions
        if (response) {

          // If transactions returns a concept, convert to JSON the Resource
          if (response instanceof Object && !(response instanceof Array)) {
            return this.businessNetworkDefinition.getSerializer().toJSON(response);

          } else if (response instanceof Array) {
            // If transactions returns an array of concept, convert all Concepts to JSON
            let conceptArray = [];

            response.forEach(item => {
              if (item instanceof Object) {
                let obj = this.businessNetworkDefinition.getSerializer().toJSON(item);
                if (obj) {
                  conceptArray.push(obj);
                }
              } else {
                conceptArray.push(item);
              }
            });

            return conceptArray;
          }
          // Otherwise (Primitives and ENUMs) return the response
          return response;
        }
        return resource.getIdentifier();
      });
  }

  isObject (o) {
    return isPlainObject(o)
    return o !== null && typeof o === 'object' && Array.isArray(o) === false;
  }

}
module.exports = Transaction;
