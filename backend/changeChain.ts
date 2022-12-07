import { getChainData } from "../lib/utilities";


const changeChain = async (provider: any, newChain: number | undefined) => {
    if (!newChain) {
        return
    }
    
    const chainData = getChainData(newChain)

    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainData?.chainIdHex }],
        });
    } catch (error: any) {
        if (error.code === 4902 || error.data.originalError.code === 4902) {
            try {
                await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: chainData?.chainIdHex,
                            chainName: chainData?.name,
                            rpcUrls: [chainData?.rpcUrl],
                            nativeCurrency: {
                                name: chainData?.nativeCurrency.name,
                                symbol: chainData?.nativeCurrency.symbol,
                                decimals: 18,
                            },
                            blockExplorerUrls: [chainData?.blockExplorer],
                        },
                    ],
                });
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }
}


export default changeChain
