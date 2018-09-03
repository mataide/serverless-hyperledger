/**
 * @name AbstractCore
 * @description Abstract Core class
 */
module.exports = class AbstractCore {
  constructor(connection) {
    const {
      bizNetworkConnection,
      businessNetworkDefinition,
      network,
      cardname
    } = connection
    this._connection = connection
    this.bizNetworkConnection = bizNetworkConnection
    this.businessNetworkDefinition = businessNetworkDefinition
    this.network = network
    this.cardname = cardname
  }
}
