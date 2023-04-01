import { IoClose } from "react-icons/io5"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import OvalButton from "./Buttons/OvalButton"
import OptimizedImage from "./OptimizedImage"
import { Metaverse } from "../../lib/metaverse"
import ScrollBar from "../ScrollBar"

interface ShopCartCardProps {
  imageUrl: string,
  metaverse: Metaverse,
  title: string,
  ethPrice: number
  openseaLink: string
}

const ShopCartCard = ({ imageUrl, metaverse, title, ethPrice, openseaLink }: ShopCartCardProps) => {
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

  return (
    <div className="relative nm-flat-medium rounded-xl h-[230px] flex w-full">
      <OptimizedImage
        height={230}
        width={180}
        src={imageUrl}
        rounded="xl"
        className="w-[150px] flex-none"
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
            onClick={() => { }}
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
        <button className="nm-flat-medium p-2 rounded-lg">MOVE TO WATCHLIST</button>
      </div>
    </div>
  )
}

interface ShopCardModalProps {
  setOpenSpecificModal: Function
}

const ShopCartModal = ({ setOpenSpecificModal }: ShopCardModalProps) => {
  const [accumulatedEthereumPrices, setAccumulatedEthereumPrices] = useState<number>(0);

  // Scrollbar Controller
  const parentRef = useRef<HTMLDivElement>(null)
  const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setParentDom(parentRef.current)
  }, [parentRef.current])

  // just for print array
  const myArray = new Array(15).fill(null);

  return (
    <div className="z-50 fixed w-full h-screen top-0 left-0 flex justify-end items-center">
      <div className="z-30">
        <div
          onClick={() => { }}
          className="relative flex flex-col justify-center m-20 bg-white w-[540px] h-[90vh] rounded-2xl"
        >
          {/* div header */}
          <div className="w-full flex justify-between items-center h-20 px-8 flex-none">
            <h2 className="font-bold text-lg">Shopping Cart</h2>
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
            {myArray.map(() => <ShopCartCard
              imageUrl="https://lh3.googleusercontent.com/Xv74CeD2yQ0AEPQ9EExQbVqArSO8QyokrW6kgquO8OyLfrZ8weW-cmIkiIhHFvLrKCGj_rCw1tovhr64HDnrYUtj8o9UqNcowj-uJNk"
              metaverse="sandbox"
              title={'Extra Large #974 (XL) parcel in somnium space'}
              ethPrice={0}
              openseaLink={'https://opensea.io/'}
            />)}
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
            <OvalButton buttonFunction={() => { }} label='Confirm purchase' fullWidth />
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