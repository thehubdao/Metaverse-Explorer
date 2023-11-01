import Tooltip from "@mui/material/Tooltip";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
import PriceListUI from "./priceList.ui";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { Metaverses } from "../../enums/metaverses.enum";
import { useTheme } from "next-themes";
import Link from "next/link";
import SpecificLandModalUI from "./specificLandModal.ui";
import { IPredictions } from "../../interfaces/heatmap.interface";
import { InformationCardForm, LandCardListForm, PriceListForm } from "../../enums/ui.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { removeLandFromWatchList } from "../../utils/watchlist/watchlist.uitl";
import { fetchWatchlist } from "../../state/watchlistSlice";

interface InformationCardUIProps {
  land: SingleLandAPIResponse;
  predictions: IPredictions | undefined;
  metaverse: Metaverses;
  landCardForm: LandCardListForm;
}
export default function InformationCardUI({ land, predictions, metaverse, landCardForm }: InformationCardUIProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.login);
  const address = useAppSelector(state => state.login.address);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const removeFromWatchlist = async (action: string) => {
    if (action === 'remove') {
      if (accessToken?.token) {
        const response = await removeLandFromWatchList(land, address!, metaverse, accessToken.token);
        if (response.success) {
          if (address) void dispatch(fetchWatchlist({ address, accessToken }));
          handleFeedback(`The Land ${land.name} was removed from your watchlist`, "warning")
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
      <div className='h-full px-7 pb-2 md:pb-0'>
        <button onClick={() => setModalOpen(true)}>
          <div className="text-start">
            <div className='w-52  mt-5'>
              {/* Asset Name */}
              <Tooltip title={land.name} placement='top' arrow>
                <p className='text-2xl text-nm-dm-remark dark:text-nm-fill font-normal truncate'>
                  {land.name}
                </p>
              </Tooltip>
              {/* Asset ID */}
              <Tooltip title={land.tokenId} placement='top' arrow>
                <p className='text-base font-normal truncate'>
                  Token ID:{land.tokenId}
                </p>
              </Tooltip>
            </div>
            <div className="mt-4 md:mt-10">
              <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm my-2">
                Price Estimation:
              </p>
              <PriceListUI predictions={predictions} form={PriceListForm.Bold}  metaverse={metaverse}/>
            </div>
          </div>
        </button>
        {/* External Links */}
        <div className='flex flex-row lg:items-center justify-between pt-4'>
          <div className="flex gap-5">
          <Link href={land.market_links?.opensea ?? ''} target='blank'>
            <Image src={`${theme !== 'dark' ? "/images/opensea-logo.png" : "/images/dm-opensea-logo.png"}`} width={20} height={20} alt='openSea' className='grayscale hover:grayscale-0 cursor-pointer' />
          </Link>
          <BsTwitter
            title='Share Valuation'
            className='h-5 w-5 text-nm-dm-icons dark:text-nm-fill hover:text-blue-400 dark:hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
          />
          </div>
          {
            landCardForm === LandCardListForm.WatchList &&
            <button
              onClick={() => void removeFromWatchlist('remove')}
              className="relative transition font-medium  ease-in-out flex gap-1 text-sm hover:text-red-400 text-red-800"
            >
              <FaTrash className="relative -bottom-005" />
            </button>
          }
        </div>
      </div>
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
      {isModalOpen && (<SpecificLandModalUI onClose={() => setModalOpen(false)} land={land} predictions={predictions} metaverse={metaverse} cardForm={InformationCardForm.NormalCard}/>)}
    </>
  )
}