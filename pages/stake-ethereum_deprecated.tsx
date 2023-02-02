import { useState } from 'react';
import Head from 'next/head'
import { NextPage } from 'next';
import { ethers } from 'ethers';

import { Chains } from '../lib/chains';
import { useAppSelector } from '../state/hooks';
import { stakeMGH, unstakeMGH } from '../backend/ethereumStaking';
import useConnectWeb3 from '../backend/connectWeb3';
import changeChain from '../backend/changeChain';

import WalletModal from "../components/WalletModal"
import TransactionModal from '../components/TransactionModal';
import StakingPool from '../components/StakingPool';


const EthereumStaking: NextPage = () => {
    const { web3Provider } = useConnectWeb3()
    const { address, chainId } = useAppSelector(state => state.account)

    const [openModal, setOpenModal] = useState(false)
    const [transactionLoading, setTransactionLoading] = useState(true)
    const [transactionModal, setTransactionModal] = useState(false)
    const [success, setSuccess] = useState(true)
    const [hash, setHash] = useState("")

    if (!transactionModal && !transactionLoading) {
        setTransactionModal(true)
    }

    const processTransaction = async (transaction: any) => {
        setHash(transaction.hash)
        setTransactionLoading(true)
        setTransactionModal(true)
        try {
            await transaction.wait();
            setSuccess(true)
            setTransactionLoading(false)
        } catch (error: any) {
            console.log(error)
            setHash(error.receipt.transactionHash)
            setSuccess(false)
            setTransactionLoading(false)
        }
    }

    const stake = async (stakeInput: string, poolId: number) => {
        const amount = ethers.utils.parseEther(stakeInput)
        const transaction = await stakeMGH(web3Provider, address, amount, poolId)
        await processTransaction(transaction)
    }

    const unstake = async (unstakeInput: string, maxUnstake: string, poolId: number) => {
        let max;
        +unstakeInput === +maxUnstake ? max = true : false
        const transaction = await unstakeMGH(web3Provider, address, unstakeInput, poolId, max)
        await processTransaction(transaction)
    }


    return (
        <>
            <Head>
                <title>MGH - Staking - Ethereum</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />}
            {transactionModal && (
                <TransactionModal onDismiss={() => { setTransactionModal(false); !transactionLoading && window.location.reload() }} loading={transactionLoading} success={success} hash={hash} chainId={chainId} />
            )}


            <div className="flex flex-col items-center  w-full bg-grey-lightest rounded-xl h-full p-10">

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 justify-items-center w-full mt-8 xl:mt-0">

                    <StakingPool poolId={0} web3Provider={web3Provider} stake={stake} unstake={unstake} />
                    <StakingPool poolId={1} web3Provider={web3Provider} stake={stake} unstake={unstake} />
                    <StakingPool poolId={2} web3Provider={web3Provider} stake={stake} unstake={unstake} />
                    <StakingPool poolId={3} web3Provider={web3Provider} stake={stake} unstake={unstake} />

                </div>

                {!web3Provider && (
                    <button onClick={() => setOpenModal(true)} className="mt-10 z-30 disabled:opacity-50 disabled:hover:shadow-dark disabled:cursor-default relative flex justify-center items-center  transition ease-in-out duration-500 rounded-2xl w-full max-w-sm py-3 sm:py-4 group">
                        <div className="h-full w-full absolute bg-grey-content transition-all ease-in-out duration-300 rounded-xl group-hover:opacity-80" />
                        <span className="pt-1 z-10 text-gray-200 font-normal font-plus text-lg sm:text-xl">Connect Wallet</span>
                    </button>
                )}

                {web3Provider && chainId !== Chains.ETHEREUM_MAINNET.chainId && (
                    <button onClick={() => { changeChain(web3Provider.provider, Chains.ETHEREUM_MAINNET.chainId) }} className="mt-10 z-30 disabled:opacity-50 disabled:hover:shadow-dark disabled:cursor-default relative flex justify-center items-center  transition ease-in-out duration-500 rounded-2xl w-full max-w-sm py-3 sm:py-4 group">
                        <div className="h-full w-full absolute bg-grey-content transition-all ease-in-out duration-300 rounded-xl group-hover:opacity-80" />
                        <span className="pt-1 z-10 text-gray-200 font-normal font-plus text-lg sm:text-xl">Switch to Ethereum</span>v
                    </button>
                )}

                <div className="flex flex-col items-end rounded-xl py-3 px-4 w-full text-center  max-w-7xl mt-auto mb-0">
                    <p className={`text-xs sm:text-sm font-plus font-normal text-grey-content p-10`}>In bonded staking, your tokens are locked for the duration of an epoch. The first 7 days of each era are the deposit / withdrawal window. During these 7 days you can deposit and withdraw tokens from the previous epoch and the newly started one. No rewards are accumulated during this time. After 7 days, all tokens committed to the pools are locked for the rest of the epoch and rewards are accumulated, which can either be withdrawn in the first 7 days of the following epoch or automatically roll over to the following epochs. <a href="/docs/staking_agreement.pdf" target="_blank" className="hover:text-blue-400 font-normal font-plus transition ease-in-out duration-300">Staking Agreement</a></p>
                </div>
            </div>


        </>
    )
}


export default EthereumStaking
