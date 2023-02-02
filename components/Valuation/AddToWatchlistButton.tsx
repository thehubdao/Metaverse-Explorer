import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
    addLandToWatchList,
    createUser,
    getUserInfo,
} from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'
import { getState } from '../../lib/utilities'
import { useAppSelector } from '../../state/hooks'

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
            className="flex text-left items-center text-gray-200 text-sm hover:text-pink-500 transition duration-300 font-medium ease-in-out"
            onClick={addToWatchList}
        >
            {'Add to Watchlist'}
        </button>
    )
}

export default AddToWatchlistButton
