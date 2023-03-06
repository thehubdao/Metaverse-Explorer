import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { addLandToWatchList, removeLandFromWatchList } from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'
import { handleLandName } from '../../lib/valuation/valuationUtils'

interface Props {
  land: any
  metaverse: Metaverse
  action: 'add' | 'remove'
}

const WatchlistButton = ({ land, metaverse, action }: Props) => {
  const { address } = useAccount()
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpenRemove(false);
    setOpenAdd(false)
  };

  const addToWatchList = async () => {
    if (!address) return
    try {
      await addLandToWatchList(land, address, metaverse)
      handleClose()
      setOpenAdd(true);
    } catch (error) {
      setOpenWarning(true)
    }
  }

  const removeLand = async () => {
    if (!address) return
    try {
      await removeLandFromWatchList(land, address, metaverse)
      handleClose()
      setOpenRemove(true)
    } catch (error) {
      setOpenWarning(true)
    }
  }

  return (
    <>
      {action === 'add' && <button
        className="w-full bg-grey-content text-white rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold"
        onClick={addToWatchList}
      >
        {'ADD TO WATCHLIST'}
      </button>}
      {action === 'remove' && <button
        className="w-full bg-grey-content text-white rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold"
        onClick={() => removeLand()}
      >
        {'REMOVE FROM WATCHLIST'}
      </button>}
      <Snackbar open={openAdd} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          The Land {handleLandName(
            metaverse,
            {
              x: land.coords ? land?.coords.x : land?.center.x,
              y: land?.coords ? land?.coords.y : land?.center.y,
            },
            land.name ? land.name : undefined
          )} whas added to your watchlist
        </Alert>
      </Snackbar>
      <Snackbar open={openRemove} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          The Land {handleLandName(
            metaverse,
            {
              x: land.coords ? land?.coords.x : land?.center.x,
              y: land?.coords ? land?.coords.y : land?.center.y,
            },
            land.name ? land.name : undefined
          )} whas removed from your watchlist
        </Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          We cant resolve the action with Land {handleLandName(
            metaverse,
            {
              x: land.coords ? land?.coords.x : land?.center.x,
              y: land?.coords ? land?.coords.y : land?.center.y,
            },
            land.name ? land.name : undefined
          )}
        </Alert>
      </Snackbar>
    </>
  )
}

export default WatchlistButton
