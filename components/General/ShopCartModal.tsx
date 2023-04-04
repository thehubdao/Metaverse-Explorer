import { IoClose } from "react-icons/io5"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import OvalButton from "./Buttons/OvalButton"
import OptimizedImage from "./OptimizedImage"
import { Metaverse } from "../../lib/metaverse"
import ScrollBar from "../ScrollBar"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../state/shopCartList"

interface ShopCartCardProps {
  imageUrl: string,
  metaverse: Metaverse,
  title: string,
  ethPrice: number
  openseaLink: string
  tokenId: number
}

const ShopCartCard = ({ imageUrl, metaverse, title, ethPrice, openseaLink, tokenId }: ShopCartCardProps) => {
  const dispatch = useDispatch();
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

  const handleShopCart = (action: 'add' | 'remove') => {
    if (action === 'remove')
      dispatch(removeFromCart({ tokenId }))
  }

  return (
    <div className="relative nm-flat-medium rounded-xl h-[230px] flex w-full">
      <OptimizedImage
        height={230}
        width={180}
        src={imageUrl}
        rounded="xl"
        className="w-[150px] flex-none rounded-r-none"
      />
      <div className='absolute bottom-4 left-3 bg-grey-panel rounded-full flex justify-center items-center p-1'>
        <OptimizedImage
          src={metaverseInfo[metaverse].image}
          width={40}
          height={40}
          rounded={"full"}
        />
      </div>
      <div className="grow flex flex-col w-1/2 p-4 justify-between items-stretch">
        <div className="flex justify-between w-full gap-4">
          <h1 className="font-bold text-lg">{title}</h1>
          <div
            className="rounded-lg nm-flat-medium p-2 w-fit h-fit hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out"
            onClick={() => { handleShopCart('remove') }}
          >
            <IoClose className="text-xl text-grey-conten" />
          </div>
        </div>
        <div className="flex mb-2 gap-4">
          <div className="flex">
            <Image
              src={'/images/eth.svg'}
              width={20}
              height={20}
              className='rounded-full'
            />
            <p className={`text-grey-content text-lg font-bold`}>
              {`${ethPrice?.toFixed(2)} ETH`}
            </p>
          </div>
          <button
            onClick={() => { window.open(openseaLink) }}
            className="flex justify-center gap-1 font-bold"
          >
            <OptimizedImage
              src="/images/icons/markets/opensea.svg"
              width={20}
              height={20}
              rounded={"full"}
            />
            OpenSea
          </button>
        </div>
        <button className="nm-flat-medium p-2 rounded-lg font-bold text-sm">MOVE TO WATCHLIST</button>
      </div>
    </div>
  )
}

interface ConfirmationCartProps {
  title: string
  ethPrice: number
}

const ConfirmationCart = ({ title, ethPrice }: ConfirmationCartProps) => {
  return (
    <div className="relative rounded-xl h-[230px] flex w-full justify-between items-center">
      <div className="flex justify-between w-2/4 gap-4">
        <h1 className="text-lg">{title}</h1>
      </div>
      <div className="flex mb-2 gap-4">
        <div className="flex justify-center items-center">
          <Image
            src={'/images/eth.svg'}
            width={20}
            height={20}
            className='rounded-full'
          />
          <p className={`text-grey-content text-lg font-bold`}>
            {`${ethPrice?.toFixed(2)} ETH`}
          </p>
        </div>
      </div>
    </div>
  )
}

interface ShopCardModalProps {
  setOpenSpecificModal: Function
}

const ShopCartModal = ({ setOpenSpecificModal }: ShopCardModalProps) => {
  const [accumulatedEthereumPrices, setAccumulatedEthereumPrices] = useState<number>(0);

  const shopList = useSelector((state: any) => state.shopCartList)

  // Scrollbar Controller
  const parentRef = useRef<HTMLDivElement>(null)
  const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setParentDom(parentRef.current)
  }, [parentRef.current])

  useEffect(() => {
    let sum = 0
    shopList.list.map((data: any) => sum = sum + data.eth_predicted_price)
    setAccumulatedEthereumPrices(sum)
  }, [shopList.length])

  // Const process control
  const [isOnListSection, setIsOnListSection] = useState<boolean>(true)

  useEffect(() => { setIsOnListSection(true) }, [])

  return (
    <div className={`z-50 fixed w-full h-screen top-0 left-0 flex items-center ${isOnListSection ? 'justify-end' : 'justify-center'}`}>
      <div className="z-30">
        <div
          onClick={() => { }}
          className={`relative flex flex-col justify-center m-20 bg-white w-[540px] rounded-2xl ${isOnListSection ? 'h-[90vh]' : 'h-[60vh]'}`}
        >
          {/* div header */}
          <div className="w-full flex justify-between items-center h-20 px-8 flex-none">
            <h2 className="font-bold text-lg">{isOnListSection ? 'Shopping Cart' : 'Checkout'}</h2>
            {/* Close button */}
            <div
              className="rounded-lg nm-flat-medium p-2 w-fit h-fit hover:nm-flat-soft hover:text-red-500 transition duration-300 ease-in-out"
              onClick={() => { setOpenSpecificModal(false) }}
            >
              <IoClose className="text-xl text-grey-conten" />
            </div>
          </div>

          {/* The list */}
          <div className="w-full grow p-8 overflow-scroll hidescroll flex flex-col gap-5" ref={parentRef}>
            {parentDom && <ScrollBar parentDom={parentDom} />}
            {isOnListSection ? (<>
              {shopList.list.map((data: any) => <ShopCartCard
                imageUrl={data.images.image_url}
                metaverse={data.metaverse}
                title={data.name ? data.name : data.tokenId}
                ethPrice={data.eth_predicted_price}
                key={data.tokenId}
                openseaLink={data.market_links.opensea}
                tokenId={data.tokenId}
              />)}
            </>
            ) : (
              <>{shopList.list.map((data: any) => <ConfirmationCart
                title={`${data.name ? data.name : data.tokenId} - ${data.metaverse}`}
                ethPrice={data.eth_predicted_price}
                key={data.tokenId}
              />)}</>
            )}
          </div>

          {/* Resume and purchase button */}
          <div className="w-full h-40 flex-none px-16 flex flex-col justify-center items-center gap-6">
            <div className="flex w-full justify-between">
              <h3>Total:</h3>
              <div className="flex">
                <Image
                  src={'/images/eth.svg'}
                  width={20}
                  height={20}
                  className='rounded-full'
                />
                <p className={`text-grey-content text-lg`}>
                  {`${accumulatedEthereumPrices?.toFixed(2)} ETH`}
                </p>
              </div>
            </div>
            <OvalButton buttonFunction={() => {
              isOnListSection ? setIsOnListSection(false) : setOpenSpecificModal(false)
            }} label='Confirm purchase' fullWidth />
          </div>

          {/* Floating dividers */}
          <div className="absolute border-b border-grey-icon top-20 w-full"></div>
          <div className="absolute border-b border-grey-icon bottom-40 w-full"></div>
        </div>
      </div>
      <div
        className="absolute w-screen h-full top-0 right-0 bg-black bg-opacity-75"
        onClick={() => { setOpenSpecificModal(false) }}
      />
    </div>
  )
}

export default ShopCartModal