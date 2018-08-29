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

/**
 * @name Query
 * @description This is a model to Query Actions
 */
class Query extends AbstractCore {
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
  async get (asset, assetId, value) {
    const query = this.bizNetworkConnection.buildQuery(
      `SELECT ${this.network}.${asset} WHERE (${assetId} == _$inputValue)`
    );
    return await this.bizNetworkConnection.query(query, { inputValue: value })
  }

  /**
   * @description Initalizes the LandRegsitry by making a connection to the Composer runtime
   * @return {Promise} A promise whose fullfillment means the initialization has completed
   */
  async queryByResource (resource, filter) {
    return await this.bizNetworkConnection.query(resource, filter)
  }
}

module.exports = Query;
