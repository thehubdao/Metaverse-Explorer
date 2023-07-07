import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import { Provider } from 'react-redux'

import store from '../state/store'
import Layout from '../layouts/Layout'
import MobileControl from '../components/MobileControl'
import web3authService from '../backend/services/Web3authService'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygon, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { Web3Auth } from '@web3auth/modal'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'

const { chains, provider } = configureChains(
    [mainnet,polygon],
    [publicProvider()]
)

const createWagmiClient = () => {

    return createClient({
        autoConnect: true,
        connectors: [
            new Web3AuthConnector({
                chains,
                options: {
                    web3AuthInstance: web3authService.getWeb3Auth as Web3Auth,
                },
            }),
        ],
        provider,
    })
}

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
    return NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <WagmiConfig client={createWagmiClient()}>
                <Provider store={store}>
                    <div className="hidden lg:block">
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </div>
                    <div className="lg:hidden h-screen w-screen bg-white fixed inset-0 z-[99]">
                        <MobileControl />
                    </div>
                </Provider>
            </WagmiConfig>
        </>
    )
}
export default MyApp