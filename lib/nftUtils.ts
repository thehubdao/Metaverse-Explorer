import { ethers } from 'ethers'
import { ERC721, TransferEvent } from '../types/ethers-contracts/ERC721'
import ERC721ABI from '../backend/abi/ERC721.json'
import { getAddress, Interface } from 'ethers/lib/utils'
import { Contracts } from './contracts'
import { Metaverse } from './metaverse'
type Provider = ethers.providers.BaseProvider

// Using a Generic ERC721 ABI!!
const createNFTContract = (provider: Provider, contractAddress: string) => {
  const contract = new ethers.Contract(
    contractAddress,
    new Interface(ERC721ABI),
    provider
  )
  return contract as ERC721
}

/**
 *  @dev Fetch User's Current Lands from the Axie Marketplace API
 *  @returns Array of tokenIds of User's Axie Lands
 * */
export const getAxieLands = async (address: string) => {
  let filteredIds: any[] = []
  const requestLands = async (from = 0) => {
    const res = await fetch(
      'https://graphql-gateway.axieinfinity.com/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: 'GetLandsGrid',
          variables: {
            from: from,
            size: 10000,
            sort: 'PriceAsc',
            auctionType: 'All',
            owner: address,
            criteria: {},
          },
          query:
            'query GetLandsGrid($from: Int!, $size: Int!, $sort: SortBy!, $owner: String, $criteria: LandSearchCriteria, $auctionType: AuctionType) {\n  lands(criteria: $criteria, from: $from, size: $size, sort: $sort, owner: $owner, auctionType: $auctionType) {\n    total\n    results {\n      ...LandBriefV2\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment LandBriefV2 on LandPlot {\n  tokenId\n  owner\n  landType\n  row\n  col\n  auction {\n    currentPrice\n    startingTimestamp\n    currentPriceUSD\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  __typename\n}\n',
        }),
      }
    )
    try {
      const results = (await res.json()).data.lands.results as any[]
      results.forEach((result) => filteredIds.push(result.tokenId))
    } catch (e) {
      console.log(e)
    }
  }

  /* Current requests Caps at 100 Results.
   Looping and ofsetting in case user owns more than 100 lands */
  for (let i = 0; i < 90601;) {
    await requestLands(i)
    i += 100
    if (filteredIds.length !== i) break
  }
  return filteredIds
}

/**
 *  @dev Fetch User's Current NFTs. Should work with any Valid ERC-721
 *  @returns Array of tokenIds (as strings) of User's NFTs
 * */
export const getUserNFTs = async (
  provider: Provider,
  address: string,
  metaverse: Metaverse
) => {
  if (!address.startsWith('0x')) return

  const contracts = {
    sandbox: Contracts.LAND.ETHEREUM_MAINNET.newAddress,
    decentraland: Contracts.PARCEL.ETHEREUM_MAINNET.address,
    'axie-infinity': Contracts.AXIE_LANDS.RONIN_MAINNET.address,
    'somnium-space': Contracts.CUBES.ETHEREUM_MAINNET.address
  }
  const contract = createNFTContract(provider, (contracts as any)[metaverse])
  // Getting al transfer events that involve the user
  const event = contract.filters.Transfer(undefined, address)

  const transferEvents = (await contract.queryFilter(event)) as
    | never[]
    | TransferEvent[]

  /* Looping through all transfer events and retrieving
    only the tokenId that user currently owns */
  const currentOwners = await Promise.all(
    transferEvents.map(async (event) => {
      const tokenId = ethers.BigNumber.from(
        event?.topics[3] || event?.args.tokenId
      ).toString()
      const ownerAddress = tokenId && (await contract.ownerOf(tokenId))
      return { ownerAddress, tokenId }
    })
  )

  // Filtering promises
  let filteredIds: string[] = []
  for (let nft of currentOwners) {
    if (
      nft.ownerAddress === getAddress(address) &&
      nft.tokenId &&
      !filteredIds.includes(nft.tokenId)
    ) {
      filteredIds.push(nft.tokenId)
    }
  }
  return filteredIds
}
export const getNftTransfersAmount = async (
  provider: Provider,
  contractAddress: string,
  tokenId: string
) => {
  const contract = createNFTContract(provider, contractAddress)
  const event = contract.filters.Transfer(
    undefined,
    undefined,
    ethers.BigNumber.from(tokenId)
  )
  const transfers = await contract.queryFilter(event)
  return transfers.length
}