import React, { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../state/hooks'

import * as loginActions from '../state/loginSlice'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient  } from 'wagmi';
import { useToken } from '../backend/useToken';
import web3authService from '../backend/services/Web3authService';

import { fetchWatchlist } from '../state/watchlistSlice';

export function Login() {
  const dispatch = useAppDispatch()

  const { accessToken }: any = useAppSelector((state) => state.login);

  const { address, isConnected } = useAccount()

  const { data } = useWalletClient()

  const [hasMounted, setHasMounted] = useState(false);

  const onTokenInvalid = async () => { dispatch(loginActions.setAccountToken({})) };

  const logout = async () => {
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
    if (isConnected) {
      loginInit()
      initAuth(data?.account)
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
    console.log("TOKEN> ", accessToken);
  }, [accessToken])

  useEffect(() => {
    if (!address || !accessToken.token) return;
    dispatch(fetchWatchlist({ address, accessToken }))
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