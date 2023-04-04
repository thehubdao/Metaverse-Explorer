import { IoClose } from "react-icons/io5"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import OvalButton from "./Buttons/OvalButton"
import OptimizedImage from "./OptimizedImage"
import { Metaverse } from "../../lib/metaverse"
import ScrollBar from "../ScrollBar"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../state/shopCartList"
import { addLandToWatchList } from "../../lib/FirebaseUtilities"
import { useAccount } from "wagmi"
import { useAppSelector } from "../../state/hooks";
import { Alert, Snackbar } from "@mui/material"

interface ShopCartCardProps {
  imageUrl: string,
  metaverse: Metaverse,
  title: string,
  ethPrice: number
  openseaLink: string
  tokenId: number
  landData: any
}

const ShopCartCard = ({ imageUrl, metaverse, title, ethPrice, openseaLink, tokenId, landData }: ShopCartCardProps) => {
  const dispatch = useDispatch();
  const { address } = useAccount()
  const { token }: any = useAppSelector((state) => state.account.accessToken)

  const [openAdd, setOpenAdd] = useState(false);
  const [openWarning, setOpenWarning] = useState(false)

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

  const handleWatchslist = async () => {
    if (!address) return

    try {
      let response
      response = await addLandToWatchList(landData, address, metaverse, token)
      setOpenAdd(true);
    } catch (error) {
      setOpenWarning(true)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpenAdd(false);
    setOpenWarning(false);
  };

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
        <button
          onClick={() => { handleWatchslist() }}
          className="nm-flat-medium p-2 rounded-lg font-bold text-sm"
        >MOVE TO WATCHLIST
        </button>
        <Snackbar
          open={openAdd}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
            The Land {title} was added to your watchlist
          </Alert>
        </Snackbar>
        <Snackbar
          open={openWarning}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            We cant resolve the action with Land {title}
          </Alert>
        </Snackbar>
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
  
  const [openNotification, setOpenNotification] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event,) => {
    setOpenNotification(false);
  };

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
                landData={data}
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
              setOpenNotification(true)
              isOnListSection ? setIsOnListSection(false) : setOpenSpecificModal(false)
            }} label='Confirm purchase' fullWidth />
          </div>

          {/* Floating dividers */}
          <div className="absolute border-b border-grey-icon top-20 w-full"></div>
          <div className="absolute border-b border-grey-icon bottom-40 w-full"></div>

          <Snackbar
            open={openNotification}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }} >
              This function is currently on development
            </Alert>
          </Snackbar>
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