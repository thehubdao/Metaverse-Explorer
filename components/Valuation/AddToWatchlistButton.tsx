import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  addLandToWatchList,
  createUser,
  getUserInfo,
} from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'
import { getState } from '../../lib/utilities'
import { useAppSelector } from '../../state/hooks'

interface Props {
  landId: string
  metaverse: Metaverse
}

const WatchlistButtonState = [
  'alreadyInWatchlist',
  'limitReached',
  'canAddToWatchlist',
  'landAdded',
  'loading',
] as const

const AddToWatchlistButton = ({ landId, metaverse }: Props) => {
  const { push } = useRouter()
  const { address } = useAppSelector((state) => state.account)
  const [state, setState] = useState<typeof WatchlistButtonState[number]>()
  const [
    alreadyInWatchlist,
    limitReached,
    canAddToWatchlist,
    landAdded,
    loading,
  ] = getState(state, [...WatchlistButtonState])
  const [refetch, setRefetch] = useState(false)

  type Key =
    | 'decentraland-watchlist'
    | 'sandbox-watchlist'
    | 'axie-infinity-watchlist'

  const addToWatchList = async () => {
    if (alreadyInWatchlist || limitReached) return push('/watchlist')
    if (address && canAddToWatchlist) {
      setState('loading')
      // Adding Land to Database
      await addLandToWatchList(landId, address, metaverse)

      setState('landAdded')
      // Giving Feedback to user for Good Query
      setTimeout(() => {
        // Retrigger useEffect
        setRefetch(!refetch)
      }, 1100)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const user = (await getUserInfo(address)) as Record<Key, string[]>
        if (!user) return createUser(address)
        const metaverseKey = Object.keys(user).find((key) =>
          key.includes(metaverse)
        ) as Key | undefined
        if (!metaverseKey) return
        if (user[metaverseKey].includes(landId))
          return setState('alreadyInWatchlist')
        if (user[metaverseKey].length === 10) return setState('limitReached')
        setState('canAddToWatchlist')
      }
    }
    fetchData()
  }, [address, refetch, landId, metaverse])

  return (
    <button
      className='flex text-left items-center text-gray-200 text-sm hover:text-pink-500 transition duration-300 font-medium ease-in-out'
      onClick={addToWatchList}
    >
      {alreadyInWatchlist
        ? 'In Watchlist'
        : landAdded
        ? 'Added!'
        : loading
        ? 'Loading..'
        : limitReached
        ? 'Limit Reached'
        : 'Add to Watchlist'}
    </button>
  )
}

export default AddToWatchlistButton
