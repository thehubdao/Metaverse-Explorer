import React, { useState, useEffect } from 'react'

import { useAppDispatch } from '../state/hooks'

import * as loginActions from '../state/loginSlice'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount,  } from 'wagmi';
import { useToken } from '../backend/useToken';
import web3authService from '../backend/services/Web3authService';

export function Login() {
  const dispatch = useAppDispatch()

  const { address, isConnected } = useAccount()

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
    const accessToken: any = await web3authService.connectWeb3Auth(signer as Signer)
    dispatch(loginActions.setAccountToken(accessToken))
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      loginInit()
      initAuth()
    } else {
      dispatch(loginActions.disconnect())
    }
  }, [isConnected]);

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