import '/styles/MLMStyles.css'
import '/styles/nprogress.css' //styles of nprogress
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import { Provider } from 'react-redux'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import store from '../state/store'
import Layout from '../layouts/Layout'
import web3authService from '../backend/services/Web3authService'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { Web3Auth } from '@web3auth/modal'
import { } from '../backend/services/RoleContractService'
import { Loader } from '../components'
import MobileControl from '../components/MobileControl'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
    return NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
    const [wagmiClient, setWagmiClient] = useState<any>()
    const [loadingTimeout, setLoadingTimeout] = useState(false)
    const { chains, provider } = configureChains(
        [mainnet, polygon],
        [
          alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }),
          publicProvider()
        ]
      )
    useEffect(() => {
        setTimeout(() => {
            setLoadingTimeout(true)
        }, 3000)
    }, [])

    useEffect(() => {
        const initWagmi = async () => {
              const { connectors } = getDefaultWallets({
                appName: 'MetaGameHub',
                projectId: process.env.WALLETCONNECT_PROJECT_ID!,
                chains
              });
            const wagmiClientInstance = createClient({
                autoConnect: true,
                connectors,
                provider
              })
            setWagmiClient(wagmiClientInstance)
        }
        initWagmi()
    }, [])

    return (
        <>
            {wagmiClient && loadingTimeout ? (
                <Provider store={store}>
                    <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider chains={chains}>
                        {/* Desktop View */}
                        <div className="hidden lg:block">
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </div>
                        {/* Mobile View */}
                        <div className="lg:hidden h-screen w-screen bg-white fixed inset-0 z-[99]">
                            <MobileControl />
                        </div>
                        </RainbowKitProvider>
                    </WagmiConfig>
                </Provider>
            ) : (
                <div className='relative flex flex-col w-full h-screen justify-center items-center'>
                    <div className='w-fit'>
                        <Loader size={100} color='blue' />
                    </div>
                    <p className='absolute bottom-12 font-bold text-grey-content'>MGH loves you!</p>
                </div>
            )}
        </>
    )
}
export default MyApp
