"use client"

import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  Wallet,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { Chain, configureChains, Connector, createConfig, WagmiConfig } from "wagmi";

import { mainnet, polygon } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

import { getArcanaAuthProvider } from "../../utils/getArcanaAuthProvider";

import { ArcanaConnector } from "@arcana/auth-wagmi";

const ArcanaRainbowConnector = (chains: Chain[] | undefined) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl:
      "https://gateway.arcana.network/api/v2/app/447/logo?type=light&orientation=horizontal",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          auth: getArcanaAuthProvider(),
        },
      });
      return {
        connector,
      };
    },
  };
};

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      ArcanaRainbowConnector(chains) as Wallet<Connector<any, any>>,
      metaMaskWallet({
        chains,
        projectId: process.env.WALLETCONNECT_PROJECT_ID!,
      }),
      walletConnectWallet({
        chains,
        projectId: process.env.WALLETCONNECT_PROJECT_ID!,
      }),
    ],
  },
]);

const wagmiConfig = createConfig({
  connectors,
  publicClient,
});

function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default WagmiProvider;