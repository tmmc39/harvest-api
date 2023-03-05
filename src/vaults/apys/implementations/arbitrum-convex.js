const { get } = require('lodash')
const { cachedAxios } = require('../../../lib/db/models/cache.js')

const getApy = async (address, poolId, profitSharingFactor) => {
  let apy

  try {
    let poolName = 'arbitrum-' + address.toLowerCase() + '-' + poolId
    const response = await cachedAxios.get('https://www.convexfinance.com/api/sidechains-apys')
    const apyResult = get(response, `data.apys.` + poolName, [])
    apy = (apyResult.baseApy + apyResult.crvApy) * profitSharingFactor
  } catch (err) {
    console.error('Arbitrum Convex API error: ', err)
    apy = 0
  }

  return apy
}

module.exports = {
  getApy,
}
