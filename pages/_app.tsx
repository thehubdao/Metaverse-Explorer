import "../styles/TileMap.css";
import "../styles/Particles.css";
import "../styles/MLMStyles.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress"; //nprogress module
import { Provider } from "react-redux";

import store from "../state/store";
import Layout from "../layouts/Layout";

import "/styles/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import MobileControl from "../components/MobileControl";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "@wagmi/chains";

const chains = [polygon];

const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: process.env.WALLETCONNECT_PROJECT_ID!,
  }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => { return NProgress.start() })
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
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
      <Web3Modal
        projectId={process.env.WALLETCONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
export default MyApp;
