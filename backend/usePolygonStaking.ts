import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { formatEther } from "@ethersproject/units"

import { calcReward, getContractInfo, getMGHAllowance, getMGHBalance } from "./polygonStaking"
import { Chains } from "../lib/chains"


export default function usePolygonStaking(web3Provider: ethers.providers.Web3Provider | undefined, address: string | undefined, chainId: number | undefined) {

    const [MGHBalance, setMGHBalance] = useState("")
    const [allowance, setAllowance] = useState("")

    const [totalStaked, setTotalStaked] = useState("0")
    const [earned, setEarned] = useState("0")
    const [totalSupply, setTotalSupply] = useState("0")
    const [rewardRate, setRewardRate] = useState("0")
    const [APY, setAPY] = useState(0)

    const [loading, setLoading] = useState(true)


    useEffect(() => { 
        let active = true

        const setStates = async () => {
            let totalSupply = "0"
            let rewardRate = "0"
            let APY = 0
            let totalStaked = "0"
            let earned = "0"
            let allowance = ""
            let balance = "";

            const contractInfo  = await getContractInfo(web3Provider, chainId)
            totalSupply = formatEther(contractInfo.totalSupply)
            rewardRate = formatEther(contractInfo.rewardRate)
            APY = contractInfo.APY

            if (web3Provider && address && chainId === Chains.MATIC_MAINNET.chainId) {
                const reward = await calcReward(web3Provider, address)
                totalStaked = formatEther(reward.staked)
                earned = formatEther(reward.earned)

                allowance = formatEther(await getMGHAllowance(web3Provider, address))

                if (+allowance) {
                    balance = formatEther(await getMGHBalance(web3Provider, address))
                } 
            }

            return { totalSupply, rewardRate, APY, totalStaked, earned, allowance, balance }
        }

        setStates().then(({ totalSupply, rewardRate, APY, totalStaked, earned, allowance, balance }) => {
            if (active) {
                setTotalSupply(totalSupply)
                setRewardRate(rewardRate)
                setAPY(APY)
                setTotalStaked(totalStaked)
                setEarned(earned)
                setAllowance(allowance)
                setMGHBalance(balance)
                setLoading(false)
            }
        })

        return () => { active = false; setLoading(true) }

    }, [web3Provider, address, chainId])


    return { MGHBalance, allowance, totalStaked, earned, totalSupply, rewardRate, APY, loading }
}