"use client"

import React, { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../state/hooks'

import * as loginActions from '../state/loginSlice'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { getWalletClient } from "@wagmi/core";

import { useToken } from '../backend/useToken';
import authService from '../backend/services/AuthService';

import { fetchWatchlist } from '../state/watchlistSlice';
import { fetchPortfolio } from '../state/portfolioSlice';
import { WalletClient } from 'viem';

import ClientOnly from '../state/clientOnly';

export function Login() {

  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector((state) => state.login);

  const { address, isConnected } = useAccount();

  const [hasMounted, setHasMounted] = useState(false);

  const onTokenInvalid = () => {
    dispatch(loginActions.setAccountToken({
      expiry: undefined,
      token: undefined
    }));
  }

  const logout = async () => {
    dispatch(loginActions.setAccountToken({
      expiry: undefined,
      token: undefined
    }));
  }

  const { setToken } = useToken(onTokenInvalid, () => { }, logout);

  const loginInit = () => {
    dispatch(loginActions.connect(isConnected));
    dispatch(loginActions.setAddress(address));
  }

  const initAuth = async () => {
    const client = await getWalletClient();
    const tokenData = await authService.connect(client as WalletClient);
    dispatch(loginActions.setAccountToken(tokenData));
  }

  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    if (isConnected) {
      loginInit();
      initAuth();
    } else {
      dispatch(loginActions.disconnect());
    }
  }, [isConnected])

  useEffect(() => {
    if (!accessToken) {
      return
    }
    setToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!address || !accessToken) return;
    dispatch(fetchWatchlist({ address, accessToken }));
    (async () => {
      await dispatch(fetchPortfolio({ address }));
    })();
  }, [address, accessToken])

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <ClientOnly>
        <ConnectButton showBalance={false} />
        {hasMounted ? (
          isConnected ? <p>Connected</p> : <p>Disconnected</p>
        ) : null}
      </ClientOnly>
    </div>
  )
}