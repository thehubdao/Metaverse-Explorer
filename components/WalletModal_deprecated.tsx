import { useEffect, useRef, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { setLocal } from "../lib/local"
import { Provider } from "../lib/enums"

const WalletModal = ({ onDismiss }: any) => {
    const [provider, setProvider] = useState()
    const mounted = useRef(true)

    useEffect(() => {
        detectEthereumProvider().then((res: any) => { mounted.current && setProvider(res) })
        return () => { mounted.current = false }
    }, [])

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50">
            <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
            <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark text-center p-5 space-y-10 rounded-xl border border-white border-opacity-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl text-gray-200">
                <p className="text-3xl font-medium">Connect Wallet </p>
                <div className="flex flex-col space-y-5">
                    <div onClick={() => { provider ? setLocal("provider", Provider.METAMASK) : window.open("https://metamask.io/", "_blank"); onDismiss() }} className="flex justify-between items-center cursor-pointer hover:bg-gray-700 rounded-lg transition ease-in-out duration-300 px-2">
                        <img src="/images/metamask.svg" className="w-16 h-16" />
                        <p className="text-xl font-medium pt-1">{provider ? "MetaMask" : "MetaMask installieren"}</p>
                    </div>
                    <div onClick={() => { setLocal("provider", Provider.WALLETCONNECT); onDismiss() }} className="flex justify-between items-center cursor-pointer hover:bg-gray-700 rounded-lg transition ease-in-out duration-300 px-2">
                        <img src="/images/walletconnect.svg" className="w-16 h-16" />
                        <p className="text-xl font-medium pt-1">WalletConnect</p>
                    </div>
                </div>
                <p onClick={onDismiss} className="cursor-pointer max-w-max self-center font-medium text-gray-400">Close</p>
            </div>
        </div>

    )
}

export default WalletModal