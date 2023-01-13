import { useRouter } from 'next/router'
import Button from "./Button"
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SafeEventEmitterProvider } from "@web3auth/base";

// WEB 3 AUTH imports
import { connectWeb3Auth } from '../../backend/ConnecWeb3Auth';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setAddress, setChain, setRole } from '../../state/account'

interface ILogin {
  chainId: any
  addressFromJwt: string
  roles: undefined[] | string[]
}

const Greeting = (props: any) => {
  const router = useRouter()
  const address = useSelector((state: any) => state.account.address)
  const [userAddress, setUserAddress] = useState(address)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false)

  // web3 connect
  const dispatch = useAppDispatch()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const { address: addressFromRedux, web3auth } = useAppSelector((state) => state.account)

  const handleNextStep = () => {
    if (userAddress)
      props.actionProvider.EjectPlanExplanation(userAddress)
  }

  const handleLogin = async () => {
    let { chainId, addressFromJwt, roles }: ILogin = await connectWeb3Auth(web3auth, setProvider, addressFromRedux)
    if (chainId) dispatch(setChain(chainId))
    if (addressFromJwt) dispatch(setAddress(addressFromJwt))
    if (roles[0]) dispatch(setRole(roles[0]))
    setUserAddress(address)
  }

  const handleSetupWallet = () => {
    window.open('https://metamask.io/', '_blank')
  }

  const handleGoBack = () => {
    confirm('Sure?') ? router.push("/valuation") : ''
  }

  useEffect(() => {
    setUserAddress(address)
  }, [])

  useEffect(() => {
    if (isFirstLoad && userAddress) {
      handleNextStep()
    } else {
      setIsFirstLoad(true)
    }
  }, [web3auth, userAddress]);

  return (
    <div className="text-center mt-4">
      <p className="font-bold text-2xl">Welcome to the MGH DAO valuation services API</p>
      <p className="text-sm">This API allows you to access all the endpoints related to our valuation services</p>
      <p className="text-sm py-3 mt-40 rounded-xl border border-grey-content">To continue please connect your web3 wallet</p>
      <div className="flex w-full justify-center gap-2 mt-4">
        {
          userAddress ? (
            <Button label={`You Are connected with ${address}`} onClick={handleNextStep} />
          ) : (
            <>
              <Button label={'Login'} icon={'/images/icons/chatbot/clarity-wallet-solid.svg'} onClick={handleLogin} />
              <Button label={'Setup Wallet'} icon={'/images/icons/chatbot/gear-fill.svg'} onClick={handleSetupWallet} />
            </>
          )
        }
        <Button label={'Go back'} icon={'/images/icons/chatbot/arrow-back.svg'} onClick={handleGoBack} />
      </div>
    </div>
  )
}

export default Greeting