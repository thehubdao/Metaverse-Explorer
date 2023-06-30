import '@rainbow-me/rainbowkit/styles.css';

import {
    RainbowKitProvider,
    connectorsForWallets
} from '@rainbow-me/rainbowkit';

import { metaMaskWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import {
    mainnet,
    polygon
} from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { getArcanaAuthProvider } from './utils/getArcanaAuthProvider';

import { ArcanaConnector } from '@arcana/auth-wagmi';

const ArcanaRainbowConnector = () => {
    return {
        id: "arcana-auth",
        name: "Arcana Wallet",
        iconUrl: "https://gateway.arcana.network/api/v2/app/447/logo?type=light&orientation=horizontal",
        iconBackground: "#101010",
        createConnector: () => {
            const connector = new ArcanaConnector({
                options: {
                    auth: getArcanaAuthProvider()
                }
            });
            return {
                connector,
            }
        }
    };
};

const { chains, publicClient } = configureChains(
    [mainnet, polygon],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ETHEREUM_KEY! }),
        publicProvider()
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            ArcanaRainbowConnector() as any,
            metaMaskWallet({ chains, projectId: process.env.WALLETCONNECT_PROJECT_ID! }),
            walletConnectWallet({ chains, projectId: process.env.WALLETCONNECT_PROJECT_ID! })
        ],
    },
]);

const wagmiConfig = createConfig({
    connectors,
    publicClient,
})

export function Providers({ children }: any) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}