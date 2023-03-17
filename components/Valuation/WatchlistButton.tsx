import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
  let [landName, setLandName] = useState('')

  useEffect(() => {
    let landName = handleLandName(
      metaverse,
      {
        x: land.coords ? land?.coords.x : land?.center.x,
        y: land?.coords ? land?.coords.y : land?.center.y,
      },
      land.name ? land.name : undefined
    )
    setLandName(landName)
  }, [land])

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

  if (!address) {
    return (
      <button
        className="w-full bg-grey-icon text-white rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold"
      >
        {'LOGIN TO WATCHLIST'}
      </button>
    )
  }

  return (
    <>
      {action === 'add' && <button
        className="w-full text-black rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold nm-flat-medium hover:nm-flat-soft"
        onClick={addToWatchList}
      >
        {'ADD TO WATCHLIST'}
      </button>}
      {action === 'remove' && <button
        className="w-full text-black rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold nm-inset-medium"
        onClick={() => removeLand()}
      >
        {'REMOVE FROM WATCHLIST'}
      </button>}
      <div className='w-full flex justify-center'>
        <Snackbar
          open={openAdd}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
            The Land {landName} was added to your watchlist
          </Alert>
        </Snackbar>
        <Snackbar
          open={openRemove}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            The Land {landName} was removed from your watchlist
          </Alert>
        </Snackbar>
        <Snackbar
          open={openWarning}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            We cant resolve the action with Land {landName}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default WatchlistButton
