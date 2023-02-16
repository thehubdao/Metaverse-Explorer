import { Provider } from "@ethersproject/providers";
import { BigNumber, ethers, providers, Signer } from "ethers";
import { Chains } from "../lib/chains";

import { Contracts } from "../lib/contracts";


const MGHContract = Contracts.MGH_TOKEN.MATIC_MAINNET.address
const MGHContractAbi = Contracts.MGH_TOKEN.MATIC_MAINNET.abi

const StakingContract = Contracts.MGH_STAKING.MATIC_MAINNET.address
const StakingContractAbi = Contracts.MGH_STAKING.MATIC_MAINNET.abi


export const getMGHBalance = async (signer: Signer | undefined, address: string | undefined) => {
    if (!signer || !address) {
        return
    }

    const contract = new ethers.Contract(
        MGHContract,
        MGHContractAbi,
        signer
    );

    const balance = await contract.balanceOf(address)
    return balance
}

export const approveMGH = async (signer: Signer | undefined, address: string | undefined) => {
    if (!signer || !address) {
        return
    }

    const contract = new ethers.Contract(
        MGHContract,
        MGHContractAbi,
        signer
    );

    const result = await contract.approve(StakingContract, ethers.constants.MaxUint256)
    return result
}

export const stakeMGH = async (signer: Signer | undefined, address: string | undefined, amount: BigNumber) => {
    if (!signer || !address) {
        return
    }


    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    const transaction = await contract.stake(amount)
    return transaction
}

export const unstakeMGH = async (signer: Signer | undefined, address: string | undefined, amount: BigNumber) => {
    if (!signer || !address) {
        return
    }



    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    const transaction = await contract.withdraw(amount)
    return transaction
}

export const calcReward = async (signer: Signer, address: string) => {

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    const staked = await contract.balanceOf(address)
    const earned = await contract.earned(address)

    return { staked, earned }
}

export const getContractInfo = async (provider: Provider | undefined, chainId: number | undefined) => {

    let contractProvider;
    if (!provider || chainId !== Chains.MATIC_MAINNET.chainId) {
        contractProvider = new ethers.providers.InfuraProvider(Chains.MATIC_MAINNET.chainId, "03bfd7b76f3749c8bb9f2c91bdba37f3")
    } else {
        contractProvider = provider
    }

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        contractProvider
    );

    const totalSupply = await contract.totalSupply()
    const rewardRate = await contract.rewardRate()
    const APY = ((+ethers.utils.formatEther(rewardRate)) / (+ethers.utils.formatEther(totalSupply))*100) * 60 * 60 * 24 * 365

    return { totalSupply, rewardRate, APY }
}

export const getReward = async (signer: Signer | undefined, address: string | undefined) => {
    if (!signer || !address) {
        return
    }

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    const transaction = await contract.getReward()
    return transaction
}

export const reinvestReward = async (signer: Signer | undefined, address: string | undefined) => {
    if (!signer || !address) {
        return
    }

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    const transaction = await contract.compound()
    return transaction
}

export const getMGHAllowance = async (signer: Signer | undefined, address: string | undefined) => {
    if (!signer || !address) {
        return
    }

    const contract = new ethers.Contract(
        MGHContract,
        MGHContractAbi,
        signer
    );

    const result = await contract.allowance(address, StakingContract)
    return result
}

