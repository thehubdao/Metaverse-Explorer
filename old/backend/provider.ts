import { useEffect, useState } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider"
import detectEthereumProvider from '@metamask/detect-provider';

import { getLocal, removeLocal } from "../lib/local"
import { Provider } from "../lib/enums"
import { Chains } from "../lib/chains";


const useProvider = () => {
    const [provider, setProvider] = useState<any>()
    const providerId = getLocal("provider")

    useEffect(() => {

        if (providerId === Provider.METAMASK) {
            detectEthereumProvider().then((windowEthereum: any) => {
                windowEthereum.enable()
                    .then(() => {
                        setProvider(windowEthereum)
                    })
                    .catch(() => {
                        removeLocal("provider")
                    })
            })

        } else if (providerId === Provider.WALLETCONNECT) {
            const walletConnect = new WalletConnectProvider({
                infuraId: "03bfd7b76f3749c8bb9f2c91bdba37f3",
                rpc: {
                    137: Chains.MATIC_MAINNET.rpcUrl,
                },
            })
            walletConnect.enable()
                .then(() => {
                    setProvider(walletConnect)
                })
                .catch(() => {
                    removeLocal("provider")
                })
        } else {
            setProvider(undefined)
        }

    }, [providerId])

    return provider
}

export default useProvider
