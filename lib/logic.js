/**
 * CreateWallet
 * @param {com.serverless.CreateWallet} createWallet
 * @transaction
 */
async function createWallet(resource) {

  let asset = getFactory().newResource(NS, 'Wallet', resource.userId);
  asset.realMoney = 0.0
  asset.inRealMoney = 0.0

  let walletRegistry = await getParticipantRegistry(NS + '.Wallet')
  // Add the participant registry.
  await walletRegistry.add(asset);
  return asset;
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.trading.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeCommodity(trade) { // eslint-disable-line no-unused-vars

  // set the new owner of the commodity
  trade.commodity.owner = trade.newOwner;
  const assetRegistry = await getAssetRegistry('org.example.trading.Commodity');

  // emit a notification that a trade has occurred
  const tradeNotification = getFactory().newEvent('org.example.trading', 'TradeNotification');
  tradeNotification.commodity = trade.commodity;
  emit(tradeNotification);

  // persist the state of the commodity
  await assetRegistry.update(trade.commodity);
}