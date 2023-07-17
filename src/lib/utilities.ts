import { ethers } from 'ethers'
import { Chains, supportedChains } from './chains'
import { stakingPools } from './pools'
import { IChainData, IPoolData, ValueOf } from './types'

export function getChainData(
  chainId: number | undefined
): IChainData | undefined {
  if (!chainId) {
    return
  }

  const chainData = supportedChains.filter(
    (chain: IChainData) => chain.chainId === chainId
  )[0]

  return chainData
}

export function ellipseAddress(address = '', width = 5): string {
  if (!address) {
    return ''
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

export function getPoolData(poolId: number | undefined): IPoolData {
  const poolData = stakingPools.filter((pool) => pool.id === poolId)[0]

  return poolData
}

export const formatName = (name: string, uppercase?: boolean) => {
  const nameArray = name.split('-')
  const formattedName = nameArray
    .map((word, i) => {
      if (uppercase) return word.toUpperCase()
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
  return formattedName
}

export const handleLongLandName = (name: string, length: number) => {
  return name.length > length ? name.substring(0, length) + '..' : name
}

/**
 * @description When making dynamic component states, it might be more safe and easier to create a state that allows only one option at a time
 * This way, a component cannot be loading and having an error at the same time. This also helps when cleaning up and makes stateChanges simpler
 * However, when we want to check what the state is. We will have to check if (state === 'loading')  and this might be too lengthy.
 * Therefore use this function and take all the possible state options as booleans
 * @param state State of the component
 * @param stateOptions Array of possible States
 * @returns array of state options as booleans. Destructure them
 * @example const [loading, loaded, error] = getState(state, ['loading', 'loaded', 'error'])
 */
export const getState = (state: string | undefined, stateOptions: string[]) => {
  return stateOptions.map((option) => state === option)
}

/**
 * @returns Array of Object keys with their proper types. Use this instead of Object.keys
 */
export function typedKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj) as K[]
}

export const makeOwnProvider = (chain: ValueOf<typeof Chains>['chainId']) => {
  return new ethers.providers.InfuraProvider(
    chain,
    '03bfd7b76f3749c8bb9f2c91bdba37f3'
  )
}
