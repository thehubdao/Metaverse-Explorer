"use client"

import {useState, useEffect, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {connect, disconnect, setAccountToken, setAddress} from "../state/loginSlice";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount, useWalletClient} from 'wagmi';
import {getWalletClient} from 'wagmi/actions';
import {useToken} from '../backend/useToken';
import {fetchWatchlist} from '../state/watchlistSlice';
import {fetchPortfolio} from '../state/portfolioSlice';
import {AuthConnect} from "../utils/itrm/auth.util";
import {LogError} from "../utils/logging.util";
import {Module} from "../enums/logging.enum";


let didSignerSet = false;

export function Login() {
  const [hasMounted, setHasMounted] = useState(false);

  const {accessToken} = useAppSelector((state) => state.login);
  const {address, isConnected} = useAccount();
  const {data: walletClient} = useWalletClient();

  const dispatch = useAppDispatch();

  const onTokenInvalid = () => {
    dispatch(setAccountToken({
      expiry: undefined,
      token: undefined
    }));
  }

  const logout = () => {
    dispatch(setAccountToken({
      expiry: undefined,
      token: undefined
    }));
  }

  const {setToken} = useToken(onTokenInvalid, logout);

  const loginInit = useCallback(() => { 
    dispatch(connect(isConnected));
    dispatch(setAddress(address));
  }, [address, dispatch, isConnected])

  const initAuth = useCallback(async () => {
    const client = await getWalletClient();
    if (client == null)
      return LogError(Module.LoginComponent, "Missing Wallet client!");
    
    const tokenData = await AuthConnect(client);
    if (!tokenData.success)
      return;
    
    dispatch(setAccountToken(tokenData.value));
  }, [dispatch])

  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    if (isConnected) {
      loginInit();
    } else {
      dispatch(disconnect());
    }
  }, [isConnected, loginInit, dispatch])

  useEffect(() => {
    if (didSignerSet || !walletClient || accessToken) return;
    void initAuth();
    didSignerSet = true
  }, [walletClient, initAuth, accessToken])

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    setToken(accessToken);
  }, [accessToken, setToken])

  useEffect(() => {
    if (!address || !accessToken) return;

    void dispatch(fetchWatchlist({address, accessToken}));
    void dispatch(fetchPortfolio({address}));
  }, [address, accessToken, dispatch])

  return (
    <div>
      {hasMounted && <ConnectButton showBalance={false}/>}
    </div>
  )
}