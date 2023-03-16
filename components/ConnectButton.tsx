import { Signer } from 'ethers'
import { useCallback, useEffect } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi'
import { initContract } from '../backend/services/RoleContractService'

// web3auth service
import web3authService from '../backend/services/Web3authService'
import { useToken } from '../backend/useToken'
import { ellipseAddress } from '../lib/utilities'

// Components
import OvalButton from './General/Buttons/OvalButton'

export default function ConnectButton() {

  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: signer } = useSigner()



  const onTokenInvalid = async () => {
   /*  await web3authService.disconnectWeb3Auth() */
  };

  const refreshToken = async () => {
    try {
      const accessToken = await web3authService.refreshToken()
      console.log(accessToken)
      setToken(accessToken)
      return true
    } catch (err) {
      console.log(err)
      return false
    }


  }

  const login = async () => {
    connect({ connector: connectors[0] })
  }
  const logout = async () => {
    await web3authService.disconnectWeb3Auth()
    disconnect()
  }

  const { setToken, clearToken } = useToken(onTokenInvalid, refreshToken, logout);

  useEffect(() => {
    if (!signer) return
    const initAuth = async () => {
      const isLoggedIn = await refreshToken()
      console.log(isLoggedIn)
      if (isLoggedIn) return
      const accessToken = await web3authService.connectWeb3Auth(signer as Signer)
      setToken(accessToken)
      /* await initContract(signer as Signer) */
    }
    initAuth()
  }, [signer])



  return (
    <>
      {address ? (
        <div className="flex flex-row">
          <OvalButton
            buttonFunction={() => logout()}
            label={`${address}`}
            backgroundColorClass={'bg-white'}
          />
        </div>
      ) : (
        <OvalButton
          buttonFunction={() => login()}
          label={'Login'}
          icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
          backgroundColorClass={'bg-white'}
        />
      )}
    </>
  )
}
