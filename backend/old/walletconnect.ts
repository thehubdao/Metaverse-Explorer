import WalletConnectProvider from "@walletconnect/web3-provider";
import { removeLocal, setLocal } from "../../lib/local";
import { Provider } from "../../lib/enums";


export const connectWalletConnect = async () => {
    // const provider = new WalletConnectProvider({
    //     infuraId: "03bfd7b76f3749c8bb9f2c91bdba37f3"
    // })
    try {
        setLocal("provider", Provider.WALLETCONNECT)
        // await provider.enable();
    } catch (err){
        console.log("walletconnect err", err)
        removeLocal("provider")
    }
}