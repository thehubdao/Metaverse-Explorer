import { useEffect, useState } from "react"
import { ethers, Signer } from "ethers"
import { formatEther } from "@ethersproject/units"

import { calcReward, getContractInfo, getMGHAllowance, getMGHBalance } from "./polygonStaking"
import { Chains } from "../lib/chains"


export default function usePolygonStaking(signer: Signer | undefined, address: string | undefined, chainId: number | undefined) {
    const provider = signer?.provider
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

            const contractInfo  = await getContractInfo(provider, chainId)
            totalSupply = formatEther(contractInfo.totalSupply)
            rewardRate = formatEther(contractInfo.rewardRate)
            APY = contractInfo.APY

            if (signer && address && chainId === Chains.MATIC_MAINNET.chainId) {
                const reward = await calcReward(signer, address)
                totalStaked = formatEther(reward.staked)
                earned = formatEther(reward.earned)

                allowance = formatEther(await getMGHAllowance(signer, address))

                if (+allowance) {
                    balance = formatEther(await getMGHBalance(signer, address))
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

    }, [signer, address, chainId])


    return { MGHBalance, allowance, totalStaked, earned, totalSupply, rewardRate, APY, loading }
}