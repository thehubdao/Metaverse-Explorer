export async function getNftGlobalData() { //Should be collection
  try {
    const data = await fetch(`https://services.itrmachines.com/fluf/globalData`)
    const collectionData = await data.json()
    return collectionData
  } catch (error) {
    console.log('problem getting exchange rate for eth', error)
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

  try {
    let collectionArray = {}
    do {
      const response = await fetch(`${process.env.ITRM_SERVICE}/${collection}/collection?from=${from}&size=2000`)
      collectionArray = await response.json()
      Object.entries(collectionArray).forEach(([key, value]) => {
        dataArray.push(value);
      });
      from = from + 2000;
    } while (Object.keys(collectionArray).length > 0);
    return dataArray;
  } catch (error) {

  }
}