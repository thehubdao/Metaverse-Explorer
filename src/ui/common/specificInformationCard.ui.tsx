import { ICoinPrices, LandProps } from "../../types/valuationTypes"
import Tooltip from "@mui/material/Tooltip";
import PriceListUI from "./priceList.ui";
import SpecificPriceListUI from "./specificPriceList.ui";
import ExternalLinkUI from "./externalLink.ui";

interface SpecificInformationCardUIProps {
  land: LandProps,
  prices: ICoinPrices
}
export default function SpecificInformationCardUI({ land, prices }: SpecificInformationCardUIProps) {

  return (

    <div className='h-full px-7 text-start'>
      <div className=' mt-5'>
        {/* Asset Name */}
        <Tooltip title={land.name} placement='top' arrow>
          <p className='text-3xl text-nm-dm-highlight font-medium'>
            {land.name}
          </p>
        </Tooltip>
        <div className="my-3 flex flex-wrap gap-5">
          {
            land.owner &&
            <div>
              <p className='text-sm text-nm-dm-remark font-normal'>Owner</p>
              <Tooltip title={land.owner} placement='bottom'>
                <p className="text-base font-bold">{land.owner}</p>
              </Tooltip>
            </div>
          }
          {
            land.tokenId &&
            <div>
              <p className='text-sm text-nm-dm-remark font-normal'>Token ID</p>
              <Tooltip title={land.tokenId} placement='bottom'>
                <p className="text-base font-bold">{land.tokenId}</p>
              </Tooltip>
            </div>
          }
          {land.coords && Object.keys(land.coords).length > 0 && (
            <div>
              <p className='text-sm text-nm-dm-remark font-normal'>Coordinate</p>
              <Tooltip title={`${land.coords?.x}, ${land.coords?.y}`} placement='bottom'>
                <p className="text-base font-bold">{land.coords?.x}, {land.coords?.y}</p>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="mt-4 ml-4">
          <p className="text-nm-dm-remark font-normal text-sm my-2">
            Estimated Price:
          </p>
          <PriceListUI prices={prices} />
        </div>
        <div className="mt-4 ml-20">
          <SpecificPriceListUI prices={prices} />
        </div>
      </div>
      <div className="w-[461px] h-[155px] bg-nm-fill rounded-3xl shadow-relief-12 flex items-center justify-center mt-4">
            <p>historical estimated price</p>
      </div>
      {/* External Links */}
      <div className='flex flex-wrap mt-3'>
        <div>
          <p className="text-base text-nm-dm-remark font-normal">Find land on:</p>
          <div className="grid grid-cols-4 items-center my-2">
            <ExternalLinkUI text="Sandbox" icon='/images/somnium-space-logo.png' externalLink={land.external_link ?? ''}/>
            <ExternalLinkUI text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={land.external_link ?? ''}/>
            <ExternalLinkUI text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={land.external_link ?? ''}/>
            <ExternalLinkUI text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={land.external_link ?? ''}/>
          </div>
        </div>
      </div>
      <div className="w-[234px] h-12 rounded-3xl bg-nm-dm-icons flex items-center justify-center mt-3">
            <p className="uppercase text-nm-highlight font-bold text-sm">Add to Watchlist</p>
      </div>
    </div>


  )
}