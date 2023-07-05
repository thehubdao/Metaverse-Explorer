import React, { useState, useEffect } from 'react'

import { useAppDispatch } from '../app/state/hooks'

import * as loginActions from '../app/state/loginSlice'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function Login() {
  const dispatch = useAppDispatch()

  const { address, isConnected } = useAccount()

  const [hasMounted, setHasMounted] = useState(false);

  const loginInit = () => {
    dispatch(loginActions.connect(isConnected));
    dispatch(loginActions.setAddress(address));
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      loginInit()
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