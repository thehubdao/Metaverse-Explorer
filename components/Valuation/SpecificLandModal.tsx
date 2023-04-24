import { Tooltip } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineCompress } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";
import { TbChartCandle } from 'react-icons/tb'
import { useAccount } from "wagmi";
import { Metaverse } from "../../lib/metaverse";
import { SocialMediaOptions } from "../../lib/socialMediaOptions";
import { IPredictions } from "../../lib/types";
import { ICoinPrices } from "../../lib/valuation/valuationTypes";
import { OptimizedImage, PriceList } from "../General";
import DataComparisonBox from "./DataComparison/DataComparisonBox";
import WatchlistButton from "./WatchlistButton";
import dynamic from "next/dynamic";
import NoData from "../General/NoData";
import { useAppSelector } from "../../state/hooks";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../state/shopCartList";

export const LandChart = dynamic(() => import('./SpecificLandModal/LandChart'), {
  ssr: false,
})

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
  setIsVisible: Function
  landCoords?: { x: string | number; y: string | number }
  coinPrices: ICoinPrices
}

const ExternalButton = ({ text, icon, externalLink }: {
  text: string,
  icon: string,
  externalLink: string
}) => {
  return (
    <div
      onClick={() => { window.open(externalLink, '_blank') }}
      className="w-full flex gap-2 justify-start items-center duration-150 rounded-2xl p-2 cursor-pointer h-15"
    >
      <Image
        src={icon}
        loading='lazy'
        className="rounded-3xl"
        width={20}
        height={20}
      />
      <p className="text-sm font-bold hover:font-extrabold">{text}</p>
    </div>
  )
}

const BoxData = ({ text, price, message, bigData, icon }: {
  text: string,
  price?: string | null,
  message?: string,
  bigData?: boolean
  icon?: string
}) => {
  return (
    <div className="w-full">
      <p className="text-sm text-grey-icon">{text}</p>
      <div className="flex">
        {icon && <Image
          src={icon}
          width={20}
          height={20}
          className='rounded-full'
        />}
        <p className={`${bigData ? 'text-xl' : 'text-lg'}`}>
          {price && price !== '0,0' ? `${price} ETH` : message}
        </p>
      </div>
    </div>
  )
}

const SpecificLandModal = ({
  specificAssetSelected,
  collectionName,
  setOpenSpecificModal,
  predictions,
  metaverse,
  setIsVisible,
  landCoords,
  coinPrices
}: SpecificLandModalProps) => {
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState<any>()
  const { address } = useAccount()
  const { token }: any = useAppSelector((state) => state.account.accessToken)
  // chart variables
  const [loadingChart, setLoadingChart] = useState<boolean>(false)
  const [landChartData, setLandChartData] = useState<any[]>();

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

  // Shop Cart List controller
  const shopList = useSelector((state: any) => state.shopCartList)
  const [isOnShopCartList, setIsOnListSection] = useState<boolean>()
  const handleShopCart = (action: 'add' | 'remove') => {
    if (action === 'add')
      dispatch(addToCart({ land: specificAssetSelected, address: address }))
    if (action === 'remove')
      dispatch(removeFromCart({ land: { specificAssetSelected }, address: address }))
  }

  const getWatchList = async (token: string) => {
    const watchlistRequest = await axios.get(
      `${process.env.AUTH_SERVICE}/watchlistService/getWatchlist?address=${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `${token}`
        }
      }
    )
    const watchlist = watchlistRequest.data
    setWatchlist(watchlist)
  }

  const SteticTimeString = (historyTime?: string) => {
    if (!historyTime) return 'No Data'
    let time = new Date(historyTime);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = time.getFullYear();
    let month = months[time.getMonth()];
    let date = time.getDate();

    return `${date}.${month}.${year}`
  }

  const handleTimeString = (history: any) => {
    let timeString = 'No Data'
    if (history.length > 0) {
      timeString = SteticTimeString(history[history.length - 1]['timestamp'])
    } return timeString
  }

  const steticLongString = (dataString: string | undefined) => {
    if (!dataString) return 'anonymous'

    if (dataString.length > 10) {
      dataString = `${dataString.substring(0, 4)}...${dataString.substring(dataString.length - 4, dataString.length)}`
    }

    return dataString
  }

  const options = SocialMediaOptions(
    specificAssetSelected?.tokenId,
    specificAssetSelected?.metaverse,
    predictions
  )

  useEffect(() => {
    if (!token) return
    getWatchList(token)
  }, [address])

  useEffect(() => {
    const isOnShopCartListAux: boolean = shopList.list.find((land: any) => land.tokenId === specificAssetSelected?.tokenId)
    setIsOnListSection(isOnShopCartListAux)
  }, [shopList.length, specificAssetSelected])

  useEffect(() => {
    const fetchHistoricFloorPrice = async () => {
      setLoadingChart(true)
      if (specificAssetSelected.history && specificAssetSelected.history.length > 0) {
        const formatedData = specificAssetSelected.history?.map((currentData: any) => {
          const timestampString: string = `${currentData.timestamp}`
          return {
            time: timestampString.substring(0, timestampString.length - 3),
            data: currentData.valuation ? currentData.valuation : currentData.eth_price,
          }
        })
        setLandChartData(formatedData)
      } else {
        setLandChartData([])
      } setLoadingChart(false)
    }
    fetchHistoricFloorPrice()
  }, [specificAssetSelected])

  return (
    <div className="z-50 fixed w-full h-screen top-0 left-0 flex justify-center items-center">
      <div className="z-30">
        <div
          onClick={() => { }}
          className="relative flex justify-center m-20 bg-white w-fit rounded-[2rem] mx-10"
        >
          <div className="absolute right-6 top-6 flex gap-3">
            {/* Twitter button */}
            <div className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer">
              <BsTwitter
                title="Share Valuation"
                onClick={() => window.open(options.twitter.valuationLink)}
                className="text-xl text-grey-conten"
              />
            </div>
            {/* Open specific asset modal button */}
            <div
              className="w-9 h-9 rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-yellow-500 transition duration-300 ease-in-out flex justify-center items-center hover:text-sm cursor-pointer"
              onClick={() => { setOpenSpecificModal(false) }}
            >
              <AiOutlineCompress />
            </div>
            {/* Close button */}
            <div
              className="rounded-lg nm-flat-medium p-2 hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                setOpenSpecificModal(false)
                setIsVisible(false)
              }}
            >
              <IoClose className="text-xl text-grey-conten" />
            </div>
          </div>

          {specificAssetSelected
            ? (<div className={`w-full p-14 text-black`}>
              <div className={`grid grid-cols-2 gap-16`}>

                <div className="p-5 nm-flat-medium rounded-3xl w-[600px] h-[600px] self-center">
                  {/* Asset Video  or image */}
                  <div className="h-full relative flex justify-center items-center rounded-3xl">
                    {
                      specificAssetSelected["images"]["animation_url"] ? (
                        <video controls loop key={specificAssetSelected["images"]["animation_url"]} className="w-[602px] rounded-xl">
                          <source src={specificAssetSelected["images"]["animation_url"]} />
                        </video>
                      ) : (
                        <div className="w-[602px] rounded-xl">
                          <Image
                            src={specificAssetSelected["images"]['image_url']}
                            layout='fill'
                            objectFit="contain"
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
                    <div className="my-5 flex flex-wrap gap-5">
                      <div className="">
                        <h3 className="text-grey-icon text-xs">Token ID</h3>
                        <Tooltip title={specificAssetSelected['tokenId']} placement='bottom'>
                          <p className="text-sm font-bold">{steticLongString(specificAssetSelected['tokenId'])}</p>
                        </Tooltip>
                      </div>
                      {specificAssetSelected.coords &&
                        <div className="">
                          <h3 className="text-grey-icon text-xs">Coordinate</h3>
                          <div className="flex">
                            <BiTargetLock />
                            <p className="text-sm font-bold">{`X:${landCoords?.x} Y:${landCoords?.y}`}</p>
                          </div>
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
                        icon={'/images/eth.svg'}
                      />
                      <BoxData
                        text="Last bought on:"
                        message={handleTimeString(specificAssetSelected['history'])}
                      />
                    </div>
                  </div>

                  {/* Chart section */}
                  <div className="nm-flat-medium rounded-3xl h-[250px] p-5 mb-5 relative">
                    {landChartData && (landChartData.length > 0)
                      ? (<LandChart
                        data={landChartData}
                        fetching={loadingChart}
                        label='Price Estimation:'
                        prices={coinPrices}
                      />)
                      : (<div className="w-full h-full flex justify-center items-center">
                        <NoData label="No Data" imageSize={50} noMarginTop />
                      </div>)}

                    <div className="absolute flex flex-row items-center text-sm font-bold gap-2 top-2 left-2">
                      <TbChartCandle />
                      <p>Price Estimation History</p>
                    </div>
                  </div>

                  {/* Externar Links */}
                  <p className="whitespace-nowrap w-fit text-grey-icon font-bold text-xs">Find land on:</p>
                  <div className="grid grid-cols-4 items-center my-3">
                    <ExternalButton text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={specificAssetSelected['market_links']['looksrare']} />
                    <ExternalButton text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={specificAssetSelected['market_links']['opensea']} />
                    <ExternalButton text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={specificAssetSelected['market_links']['X2Y2']} />
                    <ExternalButton text={metaverseInfo[metaverse].label} icon={metaverseInfo[metaverse].image} externalLink={specificAssetSelected['external_link']} />
                  </div>

                  {/* Add To Watchlist Button */}
                  {(watchlist &&
                    watchlist[metaverse] &&
                    watchlist[metaverse][specificAssetSelected?.tokenId])
                    ? (
                      <div onClick={() => getWatchList(token)}><WatchlistButton
                        land={specificAssetSelected}
                        metaverse={specificAssetSelected.metaverse}
                        action={'remove'}
                        getWatchList={getWatchList}
                      /></div>
                    ) : (
                      <div onClick={() => getWatchList(token)}><WatchlistButton
                        land={specificAssetSelected}
                        metaverse={specificAssetSelected.metaverse}
                        action={'add'}
                        getWatchList={getWatchList}
                      /></div>
                    )
                  }
                  <button
                    className={`${isOnShopCartList ? 'nm-inset-medium' : 'nm-flat-medium hover:nm-flat-soft'} w-full text-black rounded-2xl py-3 mt-2 transition duration-300 ease-in-out text-sm font-extrabold`}
                    onClick={() => { handleShopCart(isOnShopCartList ? 'remove' : 'add') }}
                  >
                    {isOnShopCartList ? 'REMOVE FROM CART' : 'ADD TO CART'}
                  </button>
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