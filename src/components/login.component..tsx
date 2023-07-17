import React, { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../state/hooks'

import * as loginActions from '../state/loginSlice'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient  } from 'wagmi';
import { useToken } from '../backend/useToken';
import web3authService from '../backend/services/Web3authService';

import { fetchWatchlist } from '../state/watchlistSlice';
import { fetchPortfolio } from '../state/portfolioSlice';

let didSignerSet = false

export function Login() {
  const dispatch = useAppDispatch()

  const { accessToken }: any = useAppSelector((state) => state.login);

  const { address, isConnected } = useAccount()

  const [hasMounted, setHasMounted] = useState(false);

  const { data: walletClient } = useWalletClient()

  const onTokenInvalid = async () => { dispatch(loginActions.setAccountToken({})) };

  const logout = async () => {
    didSignerSet = true
    dispatch(loginActions.setAccountToken({}))
  }

  const { setToken } = useToken(onTokenInvalid, /* refreshToken */() => { }, logout);

  const loginInit = () => {
    dispatch(loginActions.connect(isConnected));
    dispatch(loginActions.setAddress(address));
  }

  const initAuth = async (signer: any) => {
    const accessToken: any = await web3authService.connectWeb3Auth(signer)
    dispatch(loginActions.setAccountToken(accessToken))
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (didSignerSet || !walletClient || accessToken.token) return
    initAuth(walletClient)
    didSignerSet = true
  }, [walletClient])

  useEffect(() => {
    if (isConnected) {
      loginInit()
    } else {
      dispatch(loginActions.disconnect())
    }
  }, [isConnected]);

  useEffect(() => {
    if (!accessToken.token) {
      setToken({})
      return
    }
    setToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!address || !accessToken.token) return;
    dispatch(fetchWatchlist({ address, accessToken }))
    dispatch(fetchPortfolio({ address }))
  }, [address, accessToken])

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <ConnectButton showBalance={false}/>
      {isConnected ? (
        <p>Connected!</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}