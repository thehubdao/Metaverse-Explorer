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
 *  @dev Fetch User's Current NFTs. Should work with any Valid ERC-721
 *  @returns Array of tokenIds (as strings) of User's NFTs
 * */
export const getUserNFTs = async (
  provider: Provider,
  providerChainName: 'Ethereum' | 'Polygon' = 'Ethereum',
  address: string,
  metaverse: Metaverse,
) => {
  if (!address.startsWith('0x')) return


  let contracts: any
  if (providerChainName === 'Ethereum') {
    contracts = {
      sandbox: Contracts.LAND.ETHEREUM_MAINNET.newAddress,
      decentraland: Contracts.PARCEL.ETHEREUM_MAINNET.address,
      'axie-infinity': Contracts.AXIE_LANDS.RONIN_MAINNET.address,
      'somnium-space': Contracts.CUBES.ETHEREUM_MAINNET.address
    }
  } else {
    contracts = {
      sandbox: Contracts.LAND.POLYGON_MAINNET.address,
      decentraland: Contracts.PARCEL.ETHEREUM_MAINNET.address,
      'axie-infinity': Contracts.AXIE_LANDS.RONIN_MAINNET.address,
      'somnium-space': Contracts.CUBES.ETHEREUM_MAINNET.address
    }
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