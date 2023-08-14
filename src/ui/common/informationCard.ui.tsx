import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import Tooltip from "@mui/material/Tooltip";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
import PriceListUI from "./priceList.ui";
import { useState } from "react";
import SpecificLandModalUI from "./specificLandModal.ui";
import { PriceListForm } from "../../enums/common.enum";

interface InformationCardUIProps {
  land: LandProps;
  prices: ICoinPrices;
}
export default function InformationCardUI({ land, prices }: InformationCardUIProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() =>setModalOpen(true)}>
        <div className='h-full px-7 text-start'>
          <div className='w-52  mt-5'>
            {/* Asset Name */}
            <Tooltip title={land.name} placement='top' arrow>
              <p className='text-2xl text-nm-dm-remark font-normal truncate' title={land.name}>
                {land.name}
              </p>
            </Tooltip>
            {/* Asset ID */}
            <p className='text-base font-normal'>
              Token ID: {land.tokenId}
            </p>
          </div>
          <div className="mt-10">
            <p className="text-nm-dm-remark font-normal text-sm my-2">
              Price Estimation:
            </p>
            <PriceListUI prices={prices} form={PriceListForm.Bold}/>
          </div>
          {/* External Links */}
          <div className='flex flex-col lg:flex-row gap-5 lg:items-center justify-start pt-4'>
            <Image src='/images/opensea-logo.png' width={20} height={20} alt='openSea' className='grayscale hover:grayscale-0 cursor-pointer' />
            <BsTwitter
              title='Share Valuation'
              className='h-5 w-5 text-nm-dm-icons hover:text-blue-400 transition ease-in-out duration-300 cursor-pointer'
            />
          </div>
        </div>
      </button>
      {isModalOpen && (<SpecificLandModalUI onClose={() =>setModalOpen(false)} land={land} prices={prices} />)}
    </>
  )
}