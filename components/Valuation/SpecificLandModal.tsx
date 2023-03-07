import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineCompress } from "react-icons/ai";
import { RiLoader3Fill } from "react-icons/ri";
import { TbChartCandle } from 'react-icons/tb'
import { useAccount } from "wagmi";
import { Metaverse } from "../../lib/metaverse";
import { IPredictions } from "../../lib/types";
import { OptimizedImage, PriceList } from "../General";
import DataComparisonBox from "./DataComparison/DataComparisonBox";
import WatchlistButton from "./WatchlistButton";

const formatter = new Intl.NumberFormat(['ban', 'id'], {
  minimumFractionDigits: 1,
  maximumFractionDigits: 5,
});

interface SpecificLandModalProps {
  collectionName: string
  setOpenSpecificModal: Function
  specificAssetSelected?: any
  predictions?: IPredictions
  metaverse: Metaverse
}

const ExternalButton = ({ text, icon, externalLink }: {
  text: string,
  icon: string,
  externalLink: string
}) => {
  return (
    <div
      onClick={() => { window.open(externalLink, '_blank') }}
      className="w-full flex flex-row gap-2 justify-center items-center nm-flat-medium hover:nm-flat-soft duration-150 rounded-2xl p-2 cursor-pointer"
    >
      <Image
        src={icon}
        loading='lazy'
        className="rounded-3xl"
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
      <p className="text-sm text-grey-icon">{text}</p>
      <p className={`${bigData ? 'text-2xl' : 'text-xl'}`}>{price && price !== '0,0' ? `${price} ETH` : message}</p>
    </div>
  )
}

const SpecificLandModal = ({
  specificAssetSelected,
  collectionName,
  setOpenSpecificModal,
  predictions,
  metaverse
}: SpecificLandModalProps) => {
  const [watchlist, setWatchlist] = useState<any>()
  const { address } = useAccount()

  const metaverseInfo = {
    sandbox: {
      image: '/images/the-sandbox-sand-logo.png',
      label: 'The Sandbox'
    },
    decentraland: {
      image: '/images/decentraland-mana-logo.png',
      label: 'Decentraland'
    },
    "somnium-space": {
      image: '/images/somnium-space-cube-logo.webp',
      label: 'Somnium Space'
    }
  }

  const getWatchList = async () => {
    const watchlistRequest = await axios.get(
      `${process.env.ITRM_SERVICE}/authservice-mgh/watchlistService/getWatchlist?address=${address}`
    )
    const watchlist = watchlistRequest.data
    setWatchlist(watchlist)
  }

  const SteticTimeString = (historyTime?: string) => {
    if (!historyTime) return 'No Data'
    let timeStringArray = historyTime.split(' ')[0].split('-')
    return `${timeStringArray[2]}.${timeStringArray[1]}.${timeStringArray[0]}`
  }

  const handleTimeString = (history: any) => {
    let timeString = 'No Data'
    if (history.length > 0) {
      timeString = SteticTimeString(history[history.length - 1]['time'])
    } return timeString
  }

  useEffect(() => {
    if (!address) return
    getWatchList()
  }, [address])

  return (
    <div className="z-50 fixed w-full h-screen top-0 left-0 flex justify-center items-center">
      <div className="z-30">
        <div
          onClick={() => { }}
          className="relative flex justify-center m-20 bg-white w-fit rounded-[2rem] mx-10"
        >
          <div
            className=" absolute rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-yellow-500 transition duration-300 ease-in-out top-6 right-6 text-xl w-9 h-9 hover:text-base flex justify-center items-center"
            onClick={() => { setOpenSpecificModal(false) }}
          >
            <AiOutlineCompress />
          </div>

          {specificAssetSelected
            ? (<div className={`w-full p-14 text-black`}>
              <div className={`grid grid-cols-2 gap-16`}>

                <div className="p-5 nm-flat-medium rounded-3xl">
                  {/* Asset Video  or image */}
                  <div className="h-full relative flex justify-center items-center rounded-3xl">
                    {
                      specificAssetSelected["images"]["animation_url"] ? (
                        <video controls loop key={specificAssetSelected["images"]["animation_url"]} className="w-[602px] h-[604px] rounded-xl">
                          <source src={specificAssetSelected["images"]["animation_url"]} />
                        </video>
                      ) : (
                        <div className="w-[602px] h-[604px] rounded-xl">
                          <Image
                            src={specificAssetSelected["images"]['image_url']}
                            layout='fill'
                            className="rounded-xl"
                          />
                        </div>
                      )
                    }
                    <div className='absolute bottom-6 left-6 bg-grey-panel rounded-full flex justify-center items-center p-[2px]'>
                      <OptimizedImage
                        src={metaverseInfo[metaverse].image}
                        width={55}
                        height={55}
                        rounded={"full"}
                      />
                    </div>
                  </div>
                </div>


                {/* Nft Identification */}
                <div className="flex flex-col h-full justify-between pt-5">
                  <div>
                    <p className="text-2xl font-bold">
                      {specificAssetSelected['name']
                        ? specificAssetSelected['name']
                        : `${collectionName.toUpperCase()} #${specificAssetSelected['tokenId']}`}
                    </p>
                    <div className="my-5">
                      <div className="">
                        <h3 className="text-grey-icon text-xs">Token ID</h3>
                        <p className="text-sm">{specificAssetSelected['tokenId']}</p>
                      </div>
                      {specificAssetSelected.coords &&
                        <div className="">
                          <h3 className="text-grey-icon text-xs">Coordinate</h3>
                          <p className="text-sm">{`X:${specificAssetSelected['coords']['x']} Y:${specificAssetSelected['coords']['y']}`}</p>
                        </div>
                      }
                    </div>
                  </div>

                  {/* Box data section */}
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="text-sm text-grey-icon">Estimated Price:</p>
                      {/* Price List */}
                      {predictions ? (
                        <div className="w-fit">
                          <PriceList
                            metaverse={metaverse}
                            predictions={predictions}
                          />
                        </div>
                      ) : (
                        <span className="flex gap-2 text-lg">
                          Fetching Predictions
                          <RiLoader3Fill className="animate-spin-slow h-5 w-5 xs:h-6 xs:w-6" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <p className="text-sm text-grey-icon">Listing price: </p>
                        <DataComparisonBox
                          currentPriceEth={specificAssetSelected.current_price_eth}
                          predictions={predictions}
                        />
                      </div>
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
                  </div>

                  {/* Externar Links */}
                  <p className="whitespace-nowrap w-fit text-grey-icon font-bold text-xs">View Land  on:</p>
                  <div className="grid grid-cols-2 gap-3 items-center mb-3">
                    <ExternalButton text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={specificAssetSelected['market_links']['looksrare']} />
                    <ExternalButton text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={specificAssetSelected['market_links']['opensea']} />
                    <ExternalButton text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={specificAssetSelected['market_links']['X2Y2']} />
                    <ExternalButton text={metaverseInfo[metaverse].label} icon={metaverseInfo[metaverse].image} externalLink={specificAssetSelected['external_link']} />
                  </div>

                  {/* Chart section */}
                  <div className="nm-flat-medium rounded-3xl h-[250px] p-5 mb-5">
                    <div className="flex flex-row items-center text-sm font-bold gap-2">
                      <TbChartCandle />
                      <p>Price Estimation History</p>
                    </div>
                    <div className="flex w-full h-full justify-center items-center font-bold">Coming soon!</div>
                  </div>

                  {/* Add To Watchlist Button */}
                  <div onClick={() => getWatchList()}><WatchlistButton
                    land={specificAssetSelected}
                    metaverse={specificAssetSelected.metaverse}
                    action={(watchlist &&
                      watchlist[metaverse] &&
                      watchlist[metaverse][specificAssetSelected?.tokenId]) ? 'add' : 'remove'}
                  /></div>
                </div>
              </div>
            </div>)
            : <p>Land not found!</p>
          }
        </div>
      </div>
      <div
        className="absolute w-screen h-full top-0 right-0 bg-black bg-opacity-75"
        onClick={() => { setOpenSpecificModal(false) }}
      />
    </div>
  )
}

export default SpecificLandModal