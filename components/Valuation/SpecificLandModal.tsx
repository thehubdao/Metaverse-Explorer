import { useState } from "react";
import Image from "next/image";
import { TbArrowBackUp, TbChartCandle } from 'react-icons/tb'
import { FiSearch } from "react-icons/fi";

const formatter = new Intl.NumberFormat(['ban', 'id'], {
  minimumFractionDigits: 1,
  maximumFractionDigits: 5,
});

interface SpecificLandModalProps {
  collectionName: string
  specificAssetSelected?: any
  handleSpecificAssetData: Function
  hiddenSearchBar?: boolean
  hiddenOwner?: boolean
  isFullHeight?: boolean
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

const Header = ({
  handleSpecificAssetData,
  hiddenSearchBar
}: { handleSpecificAssetData: Function, hiddenSearchBar?: boolean }) => {
  const [inputValue, setInputValue] = useState<string>()

  const handleClick = () => {
    handleSpecificAssetData(true, undefined, inputValue)
  }

  return (
    <div className="flex gap-2 items-center mb-5">
      <div
        onClick={() => { handleSpecificAssetData(false) }}
        className="flex justify-center items-center w-16 h-10 rounded-lg nm-flat-medium hover:nm-flat-soft duration-150 text-lg cursor-pointer"
      >
        <TbArrowBackUp />
      </div>
      {!hiddenSearchBar && <div className="relative rounded-full flex w-full">
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
      </div>}
    </div>
  )
}

const SpecificLandModal = ({
  specificAssetSelected,
  handleSpecificAssetData,
  collectionName,
  hiddenSearchBar,
  hiddenOwner,
  isFullHeight
}: SpecificLandModalProps) => {
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
    <div className="flex justify-center m-20 bg-grey-panel">
      {specificAssetSelected
        ? (<div className={`w-full max-w-7xl px-6 text-black ${isFullHeight ? 'h-screen py-7' : 'mb-10'}`}>
          <Header handleSpecificAssetData={handleSpecificAssetData} hiddenSearchBar={hiddenSearchBar} />
          <div className={`grid grid-cols-2 gap-2 ${isFullHeight ? 'h-full content-start pt-10' : ''} `}>

            {/* Nft Video */}
            <div className="w-fit h-full relative flex justify-center items-center nm-flat-medium p-5 rounded-lg">
              {
                specificAssetSelected["images"]["animation_url"] ? (
                  <video controls loop key={specificAssetSelected["images"]["animation_url"]} className="w-[502px] h-[504px] rounded-xl">
                    <source src={specificAssetSelected["images"]["animation_url"]} />
                  </video>
                ) : (
                  <div className="w-[502px] h-[504px] rounded-xl">
                    <Image
                      src={specificAssetSelected["images"]['image_url']}
                      layout='fill'
                      className="rounded-xl"
                    />
                  </div>
                )
              }
            </div>

            {/* Nft Identification */}
            <div className="flex flex-col h-full justify-between pt-5">
              <div>
                <p className="text-2xl font-bold">
                  {specificAssetSelected['name']
                    ? specificAssetSelected['name']
                    : `${collectionName.toUpperCase()} #${specificAssetSelected['tokenId']}`}
                </p>
                {!hiddenOwner && <p className="text-grey-content text-sm">Owned by {specificAssetSelected['history'].length > 0 ? specificAssetSelected['history'][specificAssetSelected['history'].length - 1]['buyer'] : 'someone'}</p>}
              </div>

              {/* Box data section */}
              <BoxData text="Price Estimation:" price={formatter.format(specificAssetSelected["floor_adjusted_predicted_price"])} bigData={true} />
              <div className="flex flex-row">
                <BoxData text="Listing Price:" price={formatter.format(specificAssetSelected["listed_eth_price"] ? specificAssetSelected['listed_eth_price'] : 0)} message='Not Listed' />
                <BoxData
                  text="Last Sale Price:"
                  price={specificAssetSelected['history'].length > 0 ? formatter.format(specificAssetSelected['history'][specificAssetSelected['history'].length - 1]['eth_price']) : undefined}
                  message="No Data"
                />
                <BoxData
                  text="Last bought on:"
                  message={handleTimeString(specificAssetSelected['history'])}
                />
              </div>

              {/* Externar Links */}
              <div className="flex flex-row gap-3 items-center">
                <p className="whitespace-nowrap w-fit text-grey-icon font-bold text-xs">View NFT  on:</p>
                <ExternalButton text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={specificAssetSelected['market_links']['looksrare']} />
                <ExternalButton text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={specificAssetSelected['market_links']['opensea']} />
                <ExternalButton text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={specificAssetSelected['market_links']['X2Y2']} />
              </div>

              {/* Chart section */}
              <div className="nm-flat-medium rounded-lg h-[250px] p-5">
                <div className="flex flex-row items-center text-sm font-bold gap-2">
                  <TbChartCandle />
                  <p>Price Estimation History</p>
                </div>
                <div className="flex w-full h-full justify-center items-center font-bold">Coming soon!</div>
              </div>
            </div>
          </div>
        </div>)
        : <p>Nft not found!</p>
      }
    </div>
  )
}

export default SpecificLandModal