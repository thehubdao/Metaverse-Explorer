export async function getNftGlobalData(collection: string) { //Should be collection
  try {
    const data = await fetch(`${process.env.ITRM_SERVICE}/mgh/v2/${collection}/globalData`)
    const collectionData = await data.json()
    return collectionData
  } catch (error) {
    console.log('problem getting global data', error)
    return {
      stats: {
        num_owners: 0,
        market_cap: 0
      }
    }
  }
}

export async function getNftCollection(collection: string) {
  const dataArray: any = [];
  let from = 0;

  const listedLibrary = await getNftCollectionListed(collection)

  try {
    let collectionArray = {}
    do {
      const response = await fetch(`${process.env.ITRM_SERVICE}/mgh/v2/${collection}/collection?from=${from}&size=2000`)
      collectionArray = await response.json()
      Object.entries(collectionArray).forEach(([key, value]) => {
        const object: any = value
        if (key in listedLibrary) {
          object.listed_eth_price = listedLibrary[key].currentPrice.eth_price
        }
        dataArray.push(object);
      });
      from = from + 2000;
    } while (Object.keys(collectionArray).length > 0);
    return dataArray;
  } catch (error) {
    console.log('problem getting collection data', error)
  }
}
export async function getDataTraits(collection: string) {
  try {
    const response = await fetch(`${process.env.ITRM_SERVICE}/mgh/v2/${collection}/traits`)
    const traits = await response.json()
    return traits
  } catch (error) {
    console.log('problem getting traits', error)
    return {
      traits: {
        name: 0,
        description: 0
      }
    }
  }
}

async function getNftCollectionListed(collection: string) {
  const listedLibrary: any = {};
  let from = 0;

  try {
    let collectionArray
    do {
      const response = await fetch(`${process.env.ITRM_SERVICE}/opensea/collections/${collection}/listings?from=${from}&size=500`)
      collectionArray = await response.json()
      collectionArray = collectionArray.result
      collectionArray.map((item: any) => {
        listedLibrary[item.tokenId] = item
      })
      from = from + 500;
    } while (collectionArray.length > 0);
  } catch (error) {
    console.log(`problem getting listings ${collection}`, error)
  }

  return listedLibrary
}