import { useRouter } from 'next/router'
import Button from "./Button"
import { useEffect, useState } from 'react'

// web3auth service
import web3authService from "../../backend/services/Web3authService";

const Greeting = (props: any) => {
  const router = useRouter()
  const [userAddress, setUserAddress] = useState(null)

  const handleNextStep = () => {
    if (userAddress)
      props.actionProvider.EjectPlanExplanation(userAddress)
  }

  const handleLogin = async () => {
    await web3authService.connectWeb3Auth()
    setUserAddress(await web3authService.getAccounts())
  }

  const handleSetupWallet = () => {
    window.open('https://metamask.io/', '_blank')
  }

  const handleGoBack = () => {
    confirm('Sure?') ? router.push("/valuation") : ''
  }

  useEffect(() => {
    const init = async () => { setUserAddress(await web3authService.getAccounts()) }
    init();
  }, [web3authService.getWeb3Auth])

  return (
    <div className="text-center mt-4">
      <p className="font-bold text-2xl">Welcome to the MGH DAO valuation services API</p>
      <p className="text-sm">This API allows you to access all the endpoints related to our valuation services</p>
      <p className="text-sm py-3 mt-40 rounded-xl border border-grey-content">To continue please connect your web3 wallet</p>
      <div className="flex w-full justify-center gap-2 mt-4">
        {
          userAddress ? (
            <Button label={`You Are connected with ${userAddress}`} onClick={handleNextStep} />
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