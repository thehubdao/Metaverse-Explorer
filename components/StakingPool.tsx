import { useEffect, useState } from "react"

import useEthereumStaking from "../backend/useEthereumStaking"
import { Tokens } from "../lib/enums"
import { getPoolData } from "../lib/utilities"
import { useAppSelector } from "../state/hooks"


const StakingPool = ({ poolId, web3Provider, stake, unstake }: any) => {
    const { address, chainId } = useAppSelector(state => state.account)
    const [stakeInput, setStakeInput] = useState("")
    const [unstakeInput, setUnstakeInput] = useState("")

    const { name, APY, lockingMonth } = getPoolData(poolId)
    const { totalStaked, MGHBalance, depositDuration, isTransferPhase, timeUntilDeposit, loading } = useEthereumStaking(web3Provider, address, chainId, poolId)

    useEffect(() => {
        if (!web3Provider) {
            setStakeInput("")
            setUnstakeInput("")
        }
    }, [web3Provider])


    return (<>
        {loading ? (
            <div className="animate-pulse h-60 w-full min-w-max max-w-md rounded-xl bg-grey-dark bg-opacity-30" />
        ) : (
            <div className="relative flex flex-col flex-grow min-w-max max-w-md w-full items-center justify-between shadow-dark rounded-xl bg-grey-dark bg-opacity-30">
                <div className={`flex flex-col w-full ${web3Provider ? "rounded-t-xl" : "rounded-xl"} p-3 stake`}>
                    <p className="stakestyletext text-2xl mb-2 font-normal font-plus">{name}</p>
                    <div className="self-start flex items-center justify-between space-x-1 sm:space-x-3 w-full">
                        <p className={`text-grey-content font-plus font-bold text-sm pt-1 flex-grow`}>APY</p>
                        <p className={`text-grey-content font-plus font-normal text-sm pt-1 text-right`}>{APY}%</p>
                    </div>
                    <div className="self-start flex items-center justify-between space-x-1 sm:space-x-3 w-full">
                        <p className={`text-grey-content font-plus font-bold text-sm pt-1 flex-grow`}>Locking Period</p>
                        <p className={`text-grey-content font-plus font-normal text-sm  pt-1 text-right`}>{lockingMonth} Month</p>
                    </div>
                    {web3Provider && (
                        <div className="self-start flex items-center justify-between space-x-1 sm:space-x-3 w-full">
                            <p className={`text-grey-content font-plus font-bold text-sm  pt-1 flex-grow`}>Your Balance</p>
                            <p className={`text-grey-content font-plus font-normal text-sm  pt-1 text-right`}>{(+totalStaked)} <span className="text-sm sm:text-base font-normal">$MGH</span></p>
                        </div>
                    )}
                </div>

                {web3Provider && (
                    <>
                        {isTransferPhase ? (
                            <>
                                <div className="flex flex-col flex-grow w-full items-stretch justify-center space-y-5 max-w-md p-3 mt-2">
                                    <div className="flex flex-col items-center">
                                        <div className="self-start flex items-center space-x-1 sm:space-x-3 w-full px-1 mb-1">
                                            <p className="text-gray-300 font-medium text-xl flex-grow">Stake</p>
                                            <p onClick={() => setStakeInput(MGHBalance)} className="text-gray-400 cursor-pointer font-medium hover:text-gray-300 transition ease-in-out duration-300">Max: {(+MGHBalance) ? (+MGHBalance).toFixed(1) : ""}</p>
                                        </div>

                                        <input onChange={(e) => { setStakeInput(e.target.value) }} value={stakeInput} autoComplete="off" required id={Tokens.MGH} type="number" placeholder="0.0" className={`text-right w-full bg-grey-dark shadow-dark hover:shadow-colorbottom focus:shadow-colorbottom bg-opacity-70 text-gray-200 font-medium text-lg sm:text-xl p-2.5 pt-3 focus:outline-none border border-opacity-10 hover:border-opacity-30 focus:border-opacity-60 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />

                                        <button disabled={stakeInput ? (+stakeInput > +MGHBalance ? true : false) : true} onClick={() => stake(stakeInput, poolId)} className={`disabled:opacity-30 disabled:hover:shadow-dark disabled:cursor-default mt-3 flex justify-center items-center border border-pink-600 shadow-dark hover:shadow-button transition ease-in-out duration-500 rounded-xl w-full py-2.5`}>
                                            <p className="pt-1 z-10 text-pink-600 font-medium text-lg">Stake $MGH</p>
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="self-start flex items-center space-x-1 sm:space-x-3 w-full px-1 mb-1">
                                            <p className="text-gray-300 font-medium text-xl flex-grow">Unstake</p>
                                            <p onClick={() => (+totalStaked) && setUnstakeInput(totalStaked)} className="text-gray-400 cursor-pointer font-medium pt-1 hover:text-gray-300 transition ease-in-out duration-300">Max: {(+totalStaked) ? (+totalStaked).toFixed(1) : ""}</p>
                                        </div>

                                        <input onChange={(e) => { setUnstakeInput(e.target.value) }} value={unstakeInput} required id={Tokens.MGH} type="number" autoComplete="off" placeholder="0.0" className={`text-right w-full bg-grey-dark shadow-dark hover:shadow-colorbottom focus:shadow-colorbottom bg-opacity-70 text-gray-200 font-medium text-lg sm:text-xl p-2.5 pt-3 focus:outline-none border border-opacity-10 hover:border-opacity-30 focus:border-opacity-60 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />

                                        <button disabled={unstakeInput ? (+unstakeInput > +totalStaked ? true : false) : true} onClick={() => unstake(unstakeInput, totalStaked, poolId)} className={`disabled:opacity-30 disabled:hover:shadow-dark disabled:cursor-default mt-3 flex justify-center items-center border border-pink-600 shadow-dark hover:shadow-button transition ease-in-out duration-500 rounded-xl w-full py-2.5`}>
                                            <p className="pt-1 z-10 text-pink-600 font-medium text-lg">Unstake $MGH</p>
                                        </button>
                                    </div>
                                </div>
                                {(depositDuration && depositDuration > 0) ? (<p className={`text-gray-500 font-medium pb-2`}>Deposit closes in {depositDuration}h</p>) : (depositDuration === 0 && <p className={`text-gray-500 font-medium pb-2`}>Deposit closes soon!</p>)}
                            </>
                        ) : (
                            <div className="flex flex-col p-5 items-center text-center">
                                <p className="text-grey-content font-plus text-2xl font-medium mt-1">Pool locked</p>
                                {(timeUntilDeposit && timeUntilDeposit > 0) ? (<p className="text-gray-400 font-medium pt-2">Next Deposit in {timeUntilDeposit} days</p>) : (timeUntilDeposit === 0 && <p className="text-gray-400 font-medium pt-2">Deposit opens soon!</p>)}
                            </div >
                        )}
                    </>
                )}

            </div >

        )}
    </>
    )
}

export default StakingPool
function MGHBalance(MGHBalance: any): void {
    throw new Error("Function not implemented.")
}

