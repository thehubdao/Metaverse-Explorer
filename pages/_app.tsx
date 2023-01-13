import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import { Provider } from 'react-redux'

import store from '../state/store'
import Layout from '../layouts/Layout'

import '/styles/nprogress.css' //styles of nprogress
import '../styles/globals.css'
import '../styles/TileMap.css'
import MobileControl from '../components/MobileControl'
import web3authService from '../backend/services/Web3authService'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => { return NProgress.start() })
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { configureChains, createClient } from "wagmi";
import { mainnet, polygon } from 'wagmi/chains'
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains([mainnet, polygon], [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new Web3AuthConnector({
      chains,
      options: {
        enableLogging: true,
        clientId: "YOUR_CLIENT_ID", // Get your own client id from https://dashboard.web3auth.io
        network: "cyan", // web3auth network, "mainnet", "cyan", "celeste" or "aqua"
        chainId: "0x1", // chainId that you want to connect with
      },
    }),
    new InjectedConnector({ chains }),
  ],
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const init = async () => { await web3authService.initWeb3auth() }
    init();
  }, [])

  return (
    <Provider store={store}>
      <div className='hidden lg:block'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      <div className="lg:hidden h-screen w-screen bg-white fixed inset-0 z-[99]">
        <MobileControl />
      </div>
    </Provider>
  )
}
export default MyApp
