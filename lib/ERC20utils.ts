import { ethers, Signer } from 'ethers'
import { TokenAbiETHMainnet } from '../types/ethers-contracts'
import { Contracts } from './contracts'
type Provider = ethers.providers.BaseProvider
// Using a Generic ERC20 ABI!!
export const createERC20Contract = (
  provider: Provider | Signer,
  contractAddress: string
) => {
  const contract = new ethers.Contract(
    contractAddress,
    Contracts.MGH_TOKEN.ETHEREUM_MAINNET.abi,
    provider
  )
  return contract as TokenAbiETHMainnet
}
