import { useState } from "react";
import { Metaverses } from "../../enums/metaverses.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { AddLandToWatchList, RemoveLandFromWatchList } from "../../utils/watchlist/watchlist.util";
import { fetchWatchlist } from "../../state/watchlistSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

interface WatchlistButtonUIProps {
  landData: SingleLandAPIResponse;
  metaverse: Metaverses;
}

export default function WatchlistButtonUI({ landData, metaverse }: WatchlistButtonUIProps) {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.login);
  const address = useAppSelector(state => state.login.address);
  const watchlist = useAppSelector(state => state.watchlist.list);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleWatchslist = async (action: string) => {
    if (action === 'add') {
      if (accessToken?.token) {
        const response = await AddLandToWatchList(landData, address!, metaverse, accessToken.token);
        if (response.success) {         
          if (address) void dispatch(fetchWatchlist({ address, accessToken }));
          handleFeedback(`The Land ${landData && landData.name} was added to your watchlist`, "success");
        } else {
          handleFeedback(`Error while adding Land to Watchlist!`, "error");
        }
      }
    } else if (action === 'remove') {
      if (accessToken?.token) {
        const response = await RemoveLandFromWatchList(landData, address!, metaverse, accessToken.token);
        if (response.success) {
          if (address) void dispatch(fetchWatchlist({ address, accessToken }));
          handleFeedback(`The Land ${landData && landData.name} was removed from your watchlist`, "warning")
        } else {
          handleFeedback(`Error while removing Land from Watchlist!`, "error");
        }
      }
    }
  }

  const handleFeedback = (customMessage: string, customSeverity: AlertColor) => {
    setMessage(customMessage);
    setSeverity(customSeverity);
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      {
        watchlist && landData && landData.tokenId && watchlist[metaverse][landData.tokenId] ?
          <button className={`w-[234px] h-12 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill py-3 transition duration-300 ease-in-out text-sm font-bold shadow-relief-16 dark:shadow-dm-relief-16 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12`} onClick={() => void handleWatchslist('remove')}>
            REMOVE FROM WATCHLIST
          </button>
          :
          <button className={`w-[234px] h-12 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill  py-3 transition duration-300 ease-in-out text-sm font-bold shadow-relief-16 dark:shadow-dm-relief-16 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12`} onClick={() => void handleWatchslist('add')}>
            ADD TO WATCHLIST
          </button>
      }
      <div className='w-full flex justify-center'>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => handleClose()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => handleClose()} severity={severity} sx={{ width: '100%' }} >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}