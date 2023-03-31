import { Alert, Snackbar } from '@mui/material'
import { Signer } from 'ethers'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork, useSigner } from 'wagmi'
import { initContract } from '../backend/services/RoleContractService'

// web3auth service
import web3authService from '../backend/services/Web3authService'
import { useToken } from '../backend/useToken'
import * as blockies from 'blockies-ts';
import { useAppSelector } from '../state/hooks'

// Components
import OvalButton from './General/Buttons/OvalButton'

export default function ConnectButton() {
  const { token }: any = useAppSelector((state) => state.account);
  const { connectors, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: globalSigner, refetch } = useSigner({ async onSettled(data) { await initContract(data as Signer) } })
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address, chainId: 1 })
  const { chain } = useNetwork()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [addressImage, setAddressImage] = useState<string>();

  const onTokenInvalid = async () => {
    await web3authService.disconnectWeb3Auth()
  };

  const refreshToken = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('accessToken') as string)
      setToken(accessToken)
      return true
    } catch { }

    setToken('')
    await logout()
    return false
  }
  useEffect(() => {
    refreshToken()
  }, [])

  // handlers
  const login = async () => {
    console.log("LOGIN")
    await connectAsync({ connector: connectors[0] })
    const { data: signer } = await refetch()
    await initAuth(signer)
    setModalIsOpen(false)
  }

  const logout = async () => {
    localStorage.removeItem('accessToken')
    await web3authService.disconnectWeb3Auth()
    disconnect()
    setToken('')
    setModalIsOpen(false)
  }
  const copyToClipboard = () => {
    const textToCopy = `${address}`;
    navigator.clipboard.writeText(textToCopy);
    setOpenNotification(true)
  };
  const handleClose = (event?: React.SyntheticEvent | Event,) => {
    setOpenNotification(false);
  };
  const openDropdownMenu = () => {
    if (!address) return
    setModalIsOpen(!modalIsOpen)
  }
  const buyerControl = (buyer: string | undefined) => {
    if (!buyer) return 'anonymous'
    if (buyer.length > 20) {
      buyer = `${buyer.substring(0, 9)}...${buyer.substring(buyer.length - 4, buyer.length)}`
    } return buyer
  }
  const switchWallet = async () => {
    logout()
    setTimeout(login, 500);
  }

  const { setToken, clearToken } = useToken(onTokenInvalid, /* refreshToken */() => { }, logout);

  const initAuth = async (signer: any) => {
    const accessToken: any = await web3authService.connectWeb3Auth(signer as Signer)
    if (!accessToken) {
      await logout()
      return
    }

    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    setToken(accessToken)

  }

  useEffect(() => {
    if (!address) return
    const imgSrc = blockies.create({ seed: address }).toDataURL();
    console.log('image src: ', imgSrc)
    setAddressImage(imgSrc)
  }, [address])

  return (
    <>
      <div
        className={`relative ${address ? 'w-[350px]' : 'w-fit'} h-full mx-8 mt-6 rounded-2xl duration-300 cursor-pointer bg-white flex flex-col items-center px-7 py-3 gap-2 select-none font-normal shadow-xl`}
      >
        {address ? (
          <div className='flex justify-between items-center gap-5 w-full h-full' onClick={() => openDropdownMenu()}>
            {<Image src={addressImage ? addressImage : '/images/icons/user.svg'} width={40} height={40} alt="ENS Avatar" className='rounded-full bg-grey-content' />}
            <p className='font-bold'>{buyerControl(ensName ? `${ensName}` : `${address}`)}</p>
            <BiChevronDown className={`${modalIsOpen ? 'rotate-180' : ''} text-xl`} />
          </div>
        ) : (
          <div onClick={() => login()} className='flex font-bold gap-1'>
            <FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />
            <p>Login</p>
          </div>
        )}
        {modalIsOpen && <div className='w-full flex flex-col justify-center items-center my-5 gap-4'>
          <div className='flex gap-2 pb-3'>
            <p className=''>Network: {chain?.name} </p>
            {(navigator.onLine) ? <div className='flex gap-[2px] py-[5px]'>
              <div className='w-1 h-full bg-green-400'></div>
              <div className='w-1 h-full bg-green-400'></div>
              <div className='w-1 h-full bg-green-400'></div>
            </div> : <div className='flex gap-[2px] py-[5px]'>
              <div className='w-1 h-full bg-grey-content'></div>
            </div>}
          </div>
          <OvalButton
            buttonFunction={() => { copyToClipboard() }}
            label={'Copy Address'}
            fullWidth
          />
          <OvalButton
            buttonFunction={() => { switchWallet() }}
            label={'Switch Wallet'}
            fullWidth
          />
          <OvalButton
            buttonFunction={() => { logout() }}
            label={'Disconnect'}
            fullWidth
          />
        </div>}
        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
            The address {address} was copy on your clipboard
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}
