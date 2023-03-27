import { Signer } from 'ethers'
import { useCallback, useEffect } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi'
import { initContract } from '../backend/services/RoleContractService'

// web3auth service
import web3authService from '../backend/services/Web3authService'
import { useToken } from '../backend/useToken'
import { ellipseAddress } from '../lib/utilities'
import { useAppDispatch, useAppSelector } from '../state/hooks'

// Components
import OvalButton from './General/Buttons/OvalButton'

export default function ConnectButton() {
  const { token }: any = useAppSelector((state) => state.account);
  const { connectors, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: globalSigner, refetch } = useSigner()



  const onTokenInvalid = async () => {
    await web3authService.disconnectWeb3Auth()
  };

  const refreshToken = async () => {
    try {
      const accessToken = await web3authService.refreshToken()
      console.log(accessToken)
      if (accessToken) {
        setToken(accessToken)
        return true
      }
    } catch (err) {
      console.log(err)
    }
    if (address) {
      logout()
      setToken('')
    }
    return false



  }
  useEffect(() => {
    refreshToken()
  }, [])

  const login = async () => {
    console.log("LOGIN")
    await connectAsync({ connector: connectors[0] })
    const { data: signer } = await refetch()
    await initAuth(signer)
  }

  const logout = async () => {
    await web3authService.disconnectWeb3Auth()
    disconnect()
    setToken('')
  }

  const { setToken, clearToken } = useToken(onTokenInvalid, refreshToken, logout);

  const initAuth = async (signer: any) => {
    const isLoggedIn = await refreshToken()
    if (isLoggedIn) return
    const accessToken = await web3authService.connectWeb3Auth(signer as Signer)

    setToken(accessToken)
    await initContract(signer as Signer)
  }


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
