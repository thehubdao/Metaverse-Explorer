import { useState } from "react";
import Image from "next/image";
import { TbArrowBackUp, TbChartCandle } from 'react-icons/tb'
import { FiSearch } from "react-icons/fi";
import { nftObject } from "../../lib/types";

const formatter = new Intl.NumberFormat(['ban', 'id'], {
  minimumFractionDigits: 1,
  maximumFractionDigits: 5,
});

interface SpecificAssetModalProps {
  collectionName: string
  specificNftSelected?: nftObject
  handleSpecificNftData: Function
}

const ExternalButton = ({ text, icon, externalLink }: {
  text: string,
  icon: string,
  externalLink: string
}) => {
  return (
    <div
      onClick={() => { window.open(externalLink, '_blank') }}
      className="w-full flex flex-row gap-2 justify-center items-center nm-flat-medium hover:nm-flat-soft duration-150 rounded-lg p-2 cursor-pointer"
    >
      <Image
        src={icon}
        loading='lazy'
        className="rounded-xl"
        width={20}
        height={20}
      />
      <p className="text-sm font-bold">{text}</p>
    </div>
  )
}

const BoxData = ({ text, price, message, bigData }: {
  text: string,
  price?: string | null,
  message?: string,
  bigData?: boolean
}) => {
  return (
    <div className="w-full">
      <p className="text-xs text-grey-icon font-bold">{text}</p>
      <p className={`${bigData ? 'text-2xl' : 'text-xl'} font-bold`}>{price && price !== '0,0' ? `${price} ETH` : message}</p>
    </div>
  )
}

const Header = ({ handleSpecificNftData }: { handleSpecificNftData: Function }) => {
  const [inputValue, setInputValue] = useState<string>()

  const handleClick = () => {
    handleSpecificNftData(true, undefined, inputValue)
  }

  return (
    <div className="flex gap-2 items-center mb-5">
      <div
        onClick={() => { handleSpecificNftData(false) }}
        className="flex justify-center items-center w-16 h-10 rounded-lg nm-flat-medium hover:nm-flat-soft duration-150 text-lg cursor-pointer"
      >
        <TbArrowBackUp />
      </div>
      <div className="relative rounded-full col-span-3 flex w-full">
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) }}
          value={inputValue}
          placeholder="Search by ID"
          min={0}
          className="font-normal font-plus justify-center text-grey-content nm-inset-soft focus:outline-none placeholder-gray-300 p-3 rounded-full w-full text-sm"
        />
        <button
          onClick={() => handleClick()}
          type="submit"
          className="absolute block right-4 top-4 text-grey-content text-sm"
        >
          <FiSearch />
        </button>
      </div>
    </div>
  )
}

const SpecificAssetModal = ({ specificNftSelected, handleSpecificNftData, collectionName }: SpecificAssetModalProps) => {

  const getLastOwner = () => {

  }

  const SteticTimeString = (historyTime: string) => {
    let timeStringArray = historyTime.split(' ')[0].split('-')
    return `${timeStringArray[2]}.${timeStringArray[1]}.${timeStringArray[0]}`
  }

  const handleTimeString = (history: any) => {
    let timeString = 'No Data'
    if (history.length > 0) {
      timeString = SteticTimeString(history[history.length - 1]['time'])
    } return timeString
  }

  return (
    <div className="w-full flex justify-center">
      {specificNftSelected
        ? (<div className="w-full max-w-7xl px-6 text-black mb-10">
          <Header handleSpecificNftData={handleSpecificNftData} />
          <div className="grid grid-cols-2 gap-2">

            {/* Nft Video */}
            <div className="w-fit h-full relative flex justify-center items-center nm-flat-medium p-5 rounded-lg">
              <video controls loop key={specificNftSelected["images"]["animation_url"]} className="w-[502px] h-[504px] rounded-xl">
                <source src={specificNftSelected["images"]["animation_url"]} />
              </video>
            </div>

            {/* Nft Identification */}
            <div className="flex flex-col h-full justify-between pt-5">
              <div>
                <p className="text-2xl font-bold">
                  {specificNftSelected['name']
                    ? specificNftSelected['name']
                    : `${collectionName.toUpperCase()} #${specificNftSelected['tokenId']}`}
                </p>
                <p className="text-grey-content text-sm">Owned by {specificNftSelected['history'].length > 0 ? specificNftSelected['history'][specificNftSelected['history'].length - 1]['buyer'] : 'someone'}</p>
              </div>

              {/* Box data section */}
              <BoxData text="Price Estimation:" price={formatter.format(specificNftSelected["floor_adjusted_predicted_price"])} bigData={true} />
              <div className="flex flex-row">
                <BoxData text="Listing Price:" price={formatter.format(specificNftSelected["listed_eth_price"] ? specificNftSelected['listed_eth_price'] : 0)} message='Not Listed' />
                <BoxData
                  text="Last Sale Price:"
                  price={specificNftSelected['history'].length > 0 ? formatter.format(specificNftSelected['history'][specificNftSelected['history'].length - 1]['eth_price']) : undefined}
                  message="No Data"
                />
                <BoxData
                  text="Last bought on:"
                  message={handleTimeString(specificNftSelected['history'])}
                />
              </div>

              {/* Externar Links */}
              <div className="flex flex-row gap-3 items-center">
                <p className="whitespace-nowrap w-fit text-grey-icon font-bold text-xs">View NFT  on:</p>
                <ExternalButton text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={specificNftSelected['market_links']['looksrare']} />
                <ExternalButton text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={specificNftSelected['market_links']['opensea']} />
                <ExternalButton text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={specificNftSelected['market_links']['X2Y2']} />
              </div>

              {/* Chart section */}
              <div className="nm-flat-medium rounded-lg h-[250px] p-5">
                <div className="flex flex-row items-center text-sm font-bold gap-2">
                  <TbChartCandle />
                  <p>Price Estimation History</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>)
        : <p>Nft not found!</p>
      }
    </div>
  )
}

export default SpecificAssetModal