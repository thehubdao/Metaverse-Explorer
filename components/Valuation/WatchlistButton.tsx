import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { addLandToWatchList, removeLandFromWatchList } from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'
import { handleLandName } from '../../lib/valuation/valuationUtils'
import { useAppSelector } from '../../state/hooks'

interface Props {
  land: any
  metaverse: Metaverse
  action: 'add' | 'remove'
  getWatchList: Function
}

const WatchlistButton = ({ land, metaverse, action, getWatchList }: Props) => {
  const { address } = useAccount()
  const { token }: any = useAppSelector((state) => state.account.accessToken)
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)
  let [landName, setLandName] = useState('')
  const { connect, connectors } = useConnect()

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
    setOpenAdd(false);
    setOpenWarning(false);
  };


  const login = async () => {
    connect({ connector: connectors[0] })
  }

  const handleWatchslist = async ({ action }: { action: 'add' | 'remove' }) => {
    if (!address) return

    try {
      let response
      if (action === 'add') {
        response = await addLandToWatchList(land, address, metaverse,token)
        handleClose()
        setOpenAdd(true);
      } else if (action === 'remove') {
        response = await removeLandFromWatchList(land, address, metaverse,token)
        handleClose()
        setOpenRemove(true)
      } else {
        throw "invalid parameter"
      }
      getWatchList(token)
    } catch (error) {
      setOpenWarning(true)
    }
  }

  if (!address) {
    return (
      <button
        className="w-full bg-grey-icon text-white rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold"
        onClick={() => login()}
      >
        {'LOGIN TO SEE WATCHLIST'}
      </button>
    )
  }

  return (
    <>
      {action === 'add' && <button
        className="w-full text-black rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold nm-flat-medium hover:nm-flat-soft"
        onClick={() => handleWatchslist({ action: 'add' })}
      >
        {'ADD TO WATCHLIST'}
      </button>}
      {action === 'remove' && <button
        className="w-full text-black rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold nm-inset-medium"
        onClick={() => handleWatchslist({ action: 'remove' })}
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
