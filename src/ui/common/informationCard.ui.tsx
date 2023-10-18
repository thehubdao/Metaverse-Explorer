import { SingleLandAPIResponse } from "../../types/valuationTypes";
import Tooltip from "@mui/material/Tooltip";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
import PriceListUI from "./priceList.ui";
import { useState } from "react";
import { InformationCardForm, PriceListForm } from "../../enums/common.enum";
import { Metaverses } from "../../enums/metaverses.enum";
import { useTheme } from "next-themes";
import Link from "next/link";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";
import SpecificLandModalUI from "./specificLandModal.ui";

interface InformationCardUIProps {
  land: SingleLandAPIResponse;
  prices: CoinValuesType;
  metaverse: Metaverses;
}
export default function InformationCardUI({ land, prices, metaverse }: InformationCardUIProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { theme } = useTheme();

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
              <PriceListUI prices={prices} form={PriceListForm.Bold}  metaverse={metaverse}/>
            </div>
          </div>
        </button>
        {/* External Links */}
        <div className='flex flex-row gap-5 lg:items-center justify-start pt-4'>
          <Link href={land.market_links?.opensea ?? ''} target='blank'>
            <Image src={`${theme !== 'dark' ? "/images/opensea-logo.png" : "/images/dm-opensea-logo.png"}`} width={20} height={20} alt='openSea' className='grayscale hover:grayscale-0 cursor-pointer' />
          </Link>
          <BsTwitter
            title='Share Valuation'
            className='h-5 w-5 text-nm-dm-icons dark:text-nm-fill hover:text-blue-400 dark:hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
          />
        </div>
      </div>
      {isModalOpen && (<SpecificLandModalUI onClose={() => setModalOpen(false)} land={land} prices={prices} metaverse={metaverse} cardForm={InformationCardForm.NormalCard}/>)}
    </>
  )
}