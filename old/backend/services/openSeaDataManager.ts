import { Contracts } from '../../lib/contracts'
import { Metaverse } from '../../lib/metaverse'

async function getCollectionStats(collectionName: string) {
  /*   if (collectionName === 'axie-infinity') {
      collectionName = 'axie'
    } */
  const data = await fetch(
    `https://api.opensea.io/api/v1/collection/${collectionName}`
  )
  const data_json = await data.json()
  return data_json
}

export async function getCoingeckoPrices() {
  let coinValues: any = {
    "decentraland": {
      "usd": 0
    },
    "ethereum": {
      "usd": 0
    },
    "metagamehub-dao": {
      "usd": 0
    },
    "ocean-protocol": {
      "usd": 0
    },
    "somnium-space-cubes": {
      "usd": 0
    },
    "tether": {
      "usd": 0
    },
    "the-sandbox": {
      "usd": 0
    },
    "usd-coin": {
      "usd": 0
    },
    "wmatic": {
      "usd": 0
    }
  }

  try {
    let coinITRM: any = await fetch(`${process.env.ITRM_SERVICE}/val-analytics/coingeckoResponse`)
    coinITRM = await coinITRM.json()

    if (coinITRM.success)
      coinValues = coinITRM.success
  } catch (error) {
    console.log(error)
  }
  return coinValues
}

async function getEthExchangePrice() {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd`
  )
  const data_json = await data.json()
  return data_json
}
async function getEstimateAccuracyValues(collectionName: string) {
  let test = '/test';
  if (collectionName === 'axie-infinity') {
    collectionName = '--'
  }
  if (collectionName === 'somnium-space') test = ''
  const data = await fetch(
    `https://services.itrmachines.com${test}/${collectionName}/performance`
  )
  const data_json = await data.json()
  return data_json
}

export async function getCollectionData(collectionName: string) {
  if (!collectionName) {
    return {}
  }
  try {
    const collectionData = await getCollectionStats(collectionName)
    return collectionData['collection']['stats']
  } catch (error) {
    console.log('problem getting collection ' + collectionName + ' ', error)
    return {}
  }
}

export async function getETHExchangeValue() {
  try {
    const collectionData = await getEthExchangePrice()
    return collectionData
  } catch (error) {
    console.log('problem getting exchange rate for eth', error)
    return {}
  }
}

export async function getEstimateAccuracy(collectionName: string) {
  if (!collectionName) {
    return {}
  }
  try {
    const collectionData = await getEstimateAccuracyValues(collectionName)
    return collectionData
  } catch (error) {
    console.log('problem getting exchange rate for eth', error)
    return {}
  }
}

export const createOpenSeaLink = (metaverse: Metaverse, landId: string) => {
  /*   if (metaverse === 'axie-infinity') return */
  const contracts = {
    decentraland: Contracts.PARCEL.ETHEREUM_MAINNET.address,
    sandbox: Contracts.LAND.ETHEREUM_MAINNET.newAddress,
    'somnium-space': Contracts.CUBES.ETHEREUM_MAINNET.address
  }

  return `https://opensea.io/assets/${contracts[metaverse]}/${landId}`
}