import React, { useEffect } from 'react'
import { Activity } from '../dashboard/Activity'
import { Inventory } from '../dashboard/Inventory'
import { Badges } from '../dashboard/Badges'
import { Leaderboard } from '../dashboard/Leaderboard'
import { LevelProgress } from '../dashboard/LevelProgress'
import WalletButton from '../WalletButton'
import { Toaster } from 'react-hot-toast'
import type { NextPage } from 'next'
import {
    checkSubscription,
    subscribeToChannel,
} from '../../../backend/services/pushService'
import toast from 'react-hot-toast'
import { useSigner } from 'wagmi'
import { Signer } from 'ethers'

const subscribeNotification = (onClick: any) => {
    toast.custom(
        (t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
            >
                <div className="flex-1 w-0 px-2">
                    <div className="flex items-center">
                        <img
                            className="h-[4.5rem] w-14"
                            src="/images/icons/information.svg"
                        ></img>
                        <div className="ml-3 flex-1">
                            <p className="p-mlm mt-1 text-sm pb-3">
                                Make sure to subscribe to our Push channel to
                                receive notifactions about your points, badges,
                                upcoming events and more.
                            </p>
                            <button
                                onClick={onClick}
                                className="z-10 border-solid border-2 w-1/2 h-full text-[12px] rounded-xl border-white mb-3 hover:border-tahiti hover:text-tahiti"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-white">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        ),
        { duration: 4000 }
    )
}

const sucessSuscription = () => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
        >
            <div className="flex-1 w-0 px-2">
                <div className="flex items-center">
                    <h2 className="text-md">GOOD</h2>
                    <div className="ml-3 flex-1">
                        <p className="p-mlm text-sm font-medium">SUBSCRIBED</p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-white">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Close
                </button>
            </div>
        </div>
    ))
}

const Dashboard: NextPage = () => {
    const { data } = useSigner()
    const signer = data as Signer

    useEffect(() => {
        const pushNotification = async () => {
            if (!signer) return
            const address = await signer.getAddress()
            const isSuscribedToPush = await checkSubscription(address)
            if (!isSuscribedToPush)
                subscribeNotification(() =>
                    subscribeToChannel(signer, sucessSuscription)
                )
        }
        pushNotification()
    }, [data])

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="container-dashboard">
                <div className="item-a">
                    <h1 className="h1-mlm">METAVERSE</h1>
                    <h2 className="h2-mlm ml-10">LOYALTY MODULE</h2>
                </div>
                <iframe
                    className="item-b"
                    id="frame"
                    src="https://avatar-generator-metagamehub.vercel.app/?campaign=mlp&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true"
                    width="100%"
                    height="100%"
                ></iframe>
                {/* https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true */}
                <div className="item-c">
                    <WalletButton />
                </div>
                <div className="item-d">
                    <Badges />
                </div>
                <div className="item-e">
                    <Inventory />
                </div>
                <div className="item-f">
                    <Leaderboard />
                </div>
                <div className="item-g">
                    <LevelProgress />
                </div>
                <div className="item-h">
                    <Activity />
                </div>
            </div>
        </>
    )
}

export default Dashboard
