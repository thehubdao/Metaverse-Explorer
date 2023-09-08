import {Chain, configureChains, createConfig} from "wagmi";
import {mainnet, polygon} from "wagmi/chains";
import {publicProvider} from "wagmi/providers/public";
import {connectorsForWallets, Wallet} from "@rainbow-me/rainbowkit";
import {ArcanaConnector} from "@arcana/auth-wagmi";
import {metaMaskWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets";
import {GetArcanaAuthProvider} from "./arcanaAuth.util";
import {LogError} from "../logging.util";
import {Module} from "../../enums/logging.enum";


function ArcanaRainbowConnector(chains: Chain[]): Wallet {
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
          auth: GetArcanaAuthProvider(),
        },
      });
      return {
        connector,
      };
    },
  };
}

function GetConnectors(chains: Chain[]) {
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  if (walletConnectProjectId == undefined) {
    LogError(Module.WagmiConfig, "Wallet connect project id env value is not defined!");
    throw Error("Wallet connect project id env value is not defined!");
  }

  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        ArcanaRainbowConnector(chains),
        metaMaskWallet({
          chains,
          projectId: walletConnectProjectId,
        }),
        walletConnectWallet({
          chains,
          projectId: walletConnectProjectId,
        }),
      ],
    },
  ]);
}

export function GetWagmiConfig() {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon],
    [
      publicProvider(),
    ]
  );

  const wagmiConfig = createConfig({
    connectors: GetConnectors(chains),
    publicClient,
  });
  
  return {chains, wagmiConfig};
}