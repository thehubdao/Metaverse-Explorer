"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiConfig} from "wagmi";
import {ReactNode} from "react";
import {GetWagmiConfig} from "../utils/web3/wagmiConfig.util";

const _providerData = GetWagmiConfig();

type WagmiProviderProps = {
  children: ReactNode;
};

export default function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <WagmiConfig config={_providerData.wagmiConfig}>
      <RainbowKitProvider chains={_providerData.chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}