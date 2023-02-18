import React from 'react'
import { useAccount } from 'wagmi'
import {
  addLandToWatchList
} from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'

interface Props {
  land: any
  metaverse: Metaverse
}

const AddToWatchlistButton = ({ land, metaverse }: Props) => {
  const { address } = useAccount()
  const addToWatchList = async () => {
    if (!address) return
    await addLandToWatchList(land, address, metaverse)
  }

  return (
    <button
      className="flex text-left items-center text-grey-content text-sm hover:text-pink-400 transition duration-300 font-medium ease-in-out"
      onClick={addToWatchList}
    >
      {'Add to Watchlist'}
    </button>
  )
}

export default AddToWatchlistButton
