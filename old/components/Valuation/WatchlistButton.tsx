import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { addLandToWatchList, removeLandFromWatchList } from '../../lib/FirebaseUtilities'
import { handleLandName } from '../../lib/valuation/valuationUtils'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { fetchWatchlist } from '../../state/watchlist' 

interface Props {
  land: any
}

const WatchlistButton = ({ land }: Props) => {
  const dispatch = useAppDispatch()
  const { address } = useAccount()
  const accessToken: any = useAppSelector((state) => state.account.accessToken)
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)
  const [landName, setLandName] = useState('')
  const { connect, connectors } = useConnect()
  const wList = useAppSelector((state) => state.watchlist.list)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpenRemove(false);
    setOpenAdd(false);
    setOpenWarning(false);
  };

  const login = async () => {
    connect({ connector: connectors[0] })
  }

  const handleWatchslist = async (action: string) => {
    if (!address) return
    try {
      if (action === 'add') {
        await addLandToWatchList(land, address!, land.metaverse, accessToken.token)
        dispatch(fetchWatchlist({address, accessToken}))
        handleClose()
        setOpenAdd(true);
      } else if (action === 'remove') {
        await removeLandFromWatchList(land, address, land.metaverse, accessToken.token)
        dispatch(fetchWatchlist({address, accessToken}))
        handleClose()
        setOpenRemove(true)
      } else {
        throw "invalid parameter"
      }
      // getWatchList(accessToken.token)
    } catch (error) {
      setOpenWarning(true)
    }
  }

  useEffect(() => {
    let landName = handleLandName(
      land.metaverse,
      {
        x: land.coords ? land?.coords.x : land?.center.x,
        y: land?.coords ? land?.coords.y : land?.center.y,
      },
      land.name ? land.name : undefined
    )
    setLandName(landName)
  }, [land])

  return (
    <>
      {
        !address ?
          <button
            className="w-full bg-grey-icon text-white rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-extrabold"
            onClick={() => login()}
          >
            LOGIN TO SEE WATCHLIST
          </button>
          :
          <>
            {
              wList[land.metaverse as keyof typeof wList][land.tokenId] ? 
              <button
                className={`w-full text-grey-content rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-bold nm-inset-medium`}
                onClick={() => handleWatchslist('remove')}
              >
                REMOVE FROM WATCHLIST
              </button>
              :
              <button
                className={`w-full text-black rounded-2xl py-3 transition duration-300 ease-in-out text-sm font-bold nm-flat-medium hover:nm-flat-soft`}
                onClick={() => handleWatchslist('add')}
              >
                ADD TO WATCHLIST
              </button>
            }
            {/* SNACKBARS */}
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
      }
    </>
  )
}

export default WatchlistButton
