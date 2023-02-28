import React from 'react'
import { useAccount } from 'wagmi'
import { addLandToWatchList } from '../../lib/FirebaseUtilities'
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
      className="w-full bg-grey-content text-white rounded-2xl p-2 transition duration-300 ease-in-out text-sm font-extrabold"
      onClick={addToWatchList}
    >
      {'ADD TO WATCHLIST'}
    </button>
  )
}

export default AddToWatchlistButton
