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
import { LogError } from "../../utils/logging.util";
import { Module } from "../../enums/logging.enum";

const ArcanaRainbowConnector = (chains: Chain[] | undefined) => {
  const arcanaProvider = getArcanaAuthProvider();
  if (arcanaProvider == undefined) {
    LogError(Module.WagmiConfig, "arcana provider is missing or undefined");
    return;
  }
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
          auth: arcanaProvider,
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

const getConnectors = () => {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  if (projectId == undefined) {
    LogError(Module.WagmiConfig, "Wallet connect project id is undefined");
    return;
  }
  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        ArcanaRainbowConnector(chains) as Wallet<Connector<unknown, unknown>>,
        metaMaskWallet({
          chains,
          projectId,
        }),
        walletConnectWallet({
          chains,
          projectId,
        }),
      ],
    },
  ]);
}

const wagmiConfig = createConfig({
  connectors: getConnectors(),
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