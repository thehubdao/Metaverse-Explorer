import { BigNumber, ethers, providers } from "ethers";

import { Chains } from "../lib/chains";
import { Contracts } from "../lib/contracts";


const MGHContract = Contracts.MGH_TOKEN.ETHEREUM_MAINNET.address
const MGHContractAbi = Contracts.MGH_TOKEN.ETHEREUM_MAINNET.abi

const StakingContract = Contracts.MGH_STAKING.ETHEREUM_MAINNET.address
const StakingContractAbi = Contracts.MGH_STAKING.ETHEREUM_MAINNET.abi


export const getMGHBalance = async (provider: providers.Web3Provider | undefined, address: string | undefined) => {
    if (!provider || !address) {
        return
    }

    const contract = new ethers.Contract(
        MGHContract,
        MGHContractAbi,
        provider
    );

    const balance = await contract.balanceOf(address)
    return balance
}

export const getStakeAmount = async (provider: providers.Web3Provider | undefined, address: string | undefined, poolId: number, isTransferPhase: boolean) => {
    if (!provider || !address) {
        return
    }

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        provider
    );

    let staked;
    if (isTransferPhase) {
        staked = await contract.viewUserTokenAmount(address, poolId)
    } else {
        staked = await contract.getUserTokenAmountAfter(address, poolId)
    }

    return staked
}

export const getPeriodInfo = async (provider: providers.Web3Provider | undefined, chainId: number | undefined, poolId: number) => {

    let contractProvider;
    if (!provider || chainId !== Chains.ETHEREUM_MAINNET.chainId) {
        contractProvider = new ethers.providers.InfuraProvider(Chains.ETHEREUM_MAINNET.chainId, "03bfd7b76f3749c8bb9f2c91bdba37f3")
    } else {
        contractProvider = provider
    }

    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        contractProvider
    );

    // const isTransferPhase = await contract.isTransferPhase(poolId)
    // const result = await contract.getPoolInfo(poolId)
    // const startOfDeposit = result[1][3].toNumber()

    const [isTransferPhase, startOfDeposithex] = await contract.getPoolInfo(poolId)
    const startOfDeposit = startOfDeposithex.toNumber()

    return { isTransferPhase, startOfDeposit }
}

export const stakeMGH = async (provider: providers.Web3Provider | undefined, address: string | undefined, amount: BigNumber, poolId: number) => {
    if (!provider || !address) {
        return
    }

    const signer = provider.getSigner()

    const contract = new ethers.Contract(
        MGHContract,
        MGHContractAbi,
        signer
    );

    const poolIdHex = ethers.utils.hexZeroPad(ethers.utils.hexValue(poolId), 32)

    const transaction = await contract.approveAndCall(StakingContract, amount, poolIdHex)
    return transaction
}

export const unstakeMGH = async (signer: providers.Web3Provider | undefined, address: string | undefined, unstakeInput: string, poolId: number, max: boolean | undefined) => {
    if (!signer || !address) {
        return
    }


    const contract = new ethers.Contract(
        StakingContract,
        StakingContractAbi,
        signer
    );

    let amount;
    if (max) {
        amount = await contract.viewUserShares(address, poolId)
    } else {
        amount = await contract.tokenToShares(ethers.utils.parseEther(unstakeInput), poolId)
    }

    const transaction = await contract.withdraw(amount, poolId)
    return transaction
}

