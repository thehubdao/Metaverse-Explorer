import React, { useEffect, useState, useRef } from 'react'
import { useProvider, useAccount, useSigner, useSwitchNetwork } from 'wagmi'
import {
    getBalance,
    getLevel as getMLPLevel,
} from '../../../backend/services/MLPContractService'
import axios from 'axios'
import toast from 'react-hot-toast'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'
import * as PushAPI from '@pushprotocol/restapi'

export const LevelProgress = () => {
    const provider = useProvider()
    const [balance, setBalance] = useState<any>()
    const [level, setLevel] = useState<any>()
    const mounted = useRef(true)
    const account = useAccount()

    const Parentdiv: any = {
        height: '12px',
        width: '100%',
        backgroundColor: '#292929',
        borderRadius: 5,
    }

    const Childdiv: any = {
        height: '100%',
        width: `100%`,
        borderRadius: 5,
        textAlign: 'right',
    }

    const progresstext: any = {
        padding: 10,
        fontWeight: 900,
    }

    const { data: signer } = useSigner()

    const subscribed = () => {
        //switchNetwork(1)
        //switchNetwork(137)
    }

    useEffect(() => {
        const claimTokens = async () => {
            !mounted.current &&
                (await axios
                    .post(
                        process.env.MLM_BACKEND_URL +
                            '/db/claimTokens?walletAddress=' +
                            account.address
                    )
                    .then(async (res) => {
                        let poinsMinted: any
                        if (typeof res.data === 'number') {
                            poinsMinted = res.data
                            toast.custom((t) => (
                                <div
                                    className={`${
                                        t.visible
                                            ? 'animate-enter'
                                            : 'animate-leave'
                                    } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
                                >
                                    <div className="flex-1 w-0 px-2">
                                        <div className="flex items-center">
                                            <h2 className="text-md">EXP</h2>
                                            <div className="ml-3 flex-1">
                                                <p className="p-mlm text-sm font-medium">
                                                    Points!
                                                </p>
                                                <p className="p-mlm mt-1 text-sm">
                                                    You have earned{' '}
                                                    {poinsMinted} points and
                                                    they are currently being
                                                    minted.
                                                </p>
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
                        } else poinsMinted = 0
                    }))
        }
        provider && claimTokens()
        return () => {
            mounted.current = false
        }
    }, [account.isConnected])

    useEffect(() => {
        const setData = async () => {
            setBalance(await getBalance(account.address, provider))
            setLevel(await getMLPLevel(account.address, provider))
        }
        if (account.isConnected) setData()
    }, [account.address])

    // tippy("#infoButton", {
    //   content: `The Metaverse Loyalty Points are a type of on-chain reputation token that can be used to acquire wearables on the MGH marketplace, gain access to MGH experiences, and participate in MGH DAO.
    //        They are an integral part of our ecosystem, serving as a measure of reputation and a way to reward users for their contributions and engagement within the platform.`,
    //   theme: "light-border",
    //   placement: "right",
    // });

    return (
        <>
            <div className="flex flex-col">
                {balance && (
                    <div className="flex items-end">
                        <h2 className="h2-mlm">{`${balance}`}</h2>
                        <h3 className="gradientText font-title text-4xl pl-2 pb-1 ">
                            MLP
                        </h3>
                        <div className="tooltip flex mx-4 border-solid border-2 w-6 h-6 text-xs rounded-full cursor-help items-center justify-center place-self-center">i
                        <div className="tooltiptext text-base">
                        The Metaverse Loyalty Points are a type of on-chain reputation token that can be used to acquire wearables on THE HUB DAO marketplace, gain access to THE HUB DAO experiences, and participate in THE HUB DAO.
                        They are an integral part of our ecosystem, serving as a measure of reputation and a way to reward users for their contributions and engagement within the platform.
                        </div>
                        </div>
                    </div>
                )}
                <div style={Parentdiv}>
                    <div style={Childdiv} className="gradientbox1">
                        <span style={progresstext}></span>
                    </div>
                </div>
                {level && (
                    <div className="flex ml-auto mr-0">
                        <h2 className="h2-mlm gradientText font-title text-2xl">
                            LVL
                        </h2>
                        <h2 className="h2-mlm pl-2 font-title text-2xl">{`${level}`}</h2>
                    </div>
                )}
            </div>
        </>
    )
}
