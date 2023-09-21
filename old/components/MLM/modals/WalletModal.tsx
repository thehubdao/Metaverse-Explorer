import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNetwork, useSwitchNetwork, useDisconnect, useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import { useRouter } from 'next/router'

export const WalletModal = ({ onDismiss }: any) => {
    const account = useAccount()
    const disconnectWallet = useDisconnect()
    const router = useRouter()
    const network = useNetwork()
    const { switchNetwork } = useSwitchNetwork({ throwForSwitchChainNotSupported: true })
    const { open } = useWeb3Modal()

    useEffect(() => {
        !account.isConnecting && !account.isConnected && router.push('/mlm')
    }, [account])

    return (
        <>
            <div className="modal text-center text-white">
                <div
                    onClick={onDismiss}
                    className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur"
                />
                <div className="z-10 w-[25rem] transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark pb-6 px-10 space-y-7 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
                    <h2 className="truncate max-h-[3.9rem] mx-4 mt-6">
                        Wallet config.
                    </h2>
                    <p className="p-mlm truncate">{account?.address}</p>
                    <div className="flex flex-row">
                        <button
                            className="py-2 mr-2 w-full border-solid border-2 rounded-xl border-white hover:border-tahiti hover:text-tahiti"
                            onClick={() => {
                                open()
                            }}
                        >
                            Switch Wallet
                        </button>
                        <button
                            className="py-2 ml-2 w-full border-solid border-2 rounded-xl border-white hover:border-tahiti hover:text-tahiti"
                            onClick={() => {
                                //dispatch(disconnect())
                                disconnectWallet.disconnect()
                            }}
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                    {network?.chain?.id !== 137 && (
                        <button
                            className="py-2 border-solid border-2 rounded-xl border-white hover:border-tahiti hover:text-tahiti"
                            onClick={async () => {switchNetwork!(137)}}
                        >
                            Switch to Polygon
                        </button>
                    )}
                    <div className="regularButton">
                        <button className="mb-4 !h-12" onClick={onDismiss}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
