import { getLocal, removeLocal, setLocal } from "../../lib/local";
import { Provider } from "../../lib/enums";

export const connectMetaMask = async () => {
    if (!window.ethereum) {
        window.open("https://metamask.io", '_blank');
    } else {
        setLocal("provider", Provider.METAMASK)
        // try {
        //     setLocal("provider", Provider.METAMASK)
        //     await window.ethereum.enable()
        // } catch(err) {
        //     console.log("metamask err", err)
        //     removeLocal("provider")
        // }

    }
}