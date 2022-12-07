import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import jwtDecode from 'jwt-decode'

import { Provider } from '../lib/enums'
import { removeLocal } from '../lib/local'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { disconnect, setAddress, setChain, setRole } from '../state/account'

import useProvider from './provider'
import { verifyMessage } from 'ethers/lib/utils'
import { fetchNonce, sendSignedNonce } from './login'

export default function useConnectWeb3() {
  const [web3Provider, setweb3Provider] =
    useState<ethers.providers.Web3Provider>()
  const dispatch = useAppDispatch()
  const provider = useProvider()
  const { address: addressFromRedux } = useAppSelector((state) => state.account)

  useEffect(() => {
    if (!provider) {
      setweb3Provider(undefined)
      return
    }
    const login = async () => {
      const ethersWeb3Provider = new ethers.providers.Web3Provider(provider)
      setweb3Provider(ethersWeb3Provider)
      const [address] = await ethersWeb3Provider.listAccounts()
      const { chainId } = await ethersWeb3Provider.getNetwork()
      dispatch(setChain(chainId))

      if (address === addressFromRedux) return

      try {
        // First Nonce Request to API
        const { nonce } = await fetchNonce(address)
        // Create Msg
        const msgToSign = 'Signing nonce: ' + nonce
        const signer = ethersWeb3Provider.getSigner()
        // Make user Sign it (React Dev Mode makes component refresh twice, so it will make user sign twice, this shouldn't happen once in production)
        const signedNonce = await signer.signMessage(msgToSign)
        // Verify Msg in frontend first
        const signedAddress = verifyMessage(msgToSign, signedNonce)
        if (signedAddress !== address) return window.location.reload()
        // JWT request to API
        const { token } = await sendSignedNonce(signedNonce, signedAddress)
        // Decode JWT and set Global State
        const { address: addressFromJwt, roles } =
          jwtDecode<{ address: string; roles: undefined[] | string[] }>(token)
        dispatch(setAddress(addressFromJwt))
        dispatch(setRole(roles[0]))
      } catch (e) {
        console.log(e)
        setweb3Provider(undefined)
      }
    }

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet()
      }
      await login()
    }

    const handleChainChanged = (newChainId: string) => {
      window.location.reload()
    }

    const handleConnect = async (info: { chainId: number }) => {
      await login()
      console.log(info)
    }

    login()

    const handleDisconnect = (error: { code: number; message: string }) => {
      console.log(error)
    }

    provider.on('accountsChanged', handleAccountsChanged)
    provider.on('chainChanged', handleChainChanged)
    provider.on('connect', handleConnect)
    provider.on('disconnect', handleDisconnect)

    return () => {
      if (provider.removeListener) {
        provider.removeListener('accountsChanged', handleAccountsChanged)
        provider.removeListener('chainChanged', handleChainChanged)
        provider.removeListener('connect', handleConnect)
        provider.removeListener('disconnect', handleDisconnect)
      }
    }
  }, [provider])

  const disconnectWallet = async () => {
    if (provider === Provider.WALLETCONNECT) {
      await provider.disconnect()
    }
    removeLocal('provider')
    dispatch(disconnect())
  }

  return { web3Provider, disconnectWallet }
}

/* import { useEffect, useState } from "react";
// HIGHLIGHTSTART-importModules
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`

export default function useConnectWeb3() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        setWeb3auth(web3auth);
        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  let web3Provider = {
    provider: 'undefined'
  }
  const disconnectWallet = () => { console.log('disconect') }

  return { web3Provider, disconnectWallet }
} */