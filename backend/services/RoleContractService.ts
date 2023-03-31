import { Contract, Signer, BigNumber } from 'ethers'

import ROLE_CONTRACT_ABI from '../abi/SimpleRolesABI.json'

const ROLE_CONTRACT_ADDRESS = process.env.ROLE_CONTRACT_ADDRESS!

let ROLE_CONTRACT: any = null

const contract_currencies = {
    USDC: async () => {
        if (ROLE_CONTRACT) return await ROLE_CONTRACT.USDC()
    },
    USDT: async () => {
        if (ROLE_CONTRACT) return await ROLE_CONTRACT.USDT()
    },
}

const initContract = async (signer: Signer) => {
    ROLE_CONTRACT = new Contract(
        ROLE_CONTRACT_ADDRESS,
        ROLE_CONTRACT_ABI,
        signer
    )
    console.log(await contract_currencies.USDC(),await contract_currencies.USDT())
}

const buyRoleB2B = async (role: number, currency: string, signer: Signer) => {
    const currency_contract_address = await contract_currencies[
        currency as keyof typeof contract_currencies
    ]()
    await ROLE_CONTRACT.startB2BSubscription(role, currency_contract_address)
}

const buyRoleB2C = async (role: number, intervals: number, currency: string, signer: Signer) => {
    const address = await signer.getAddress()
    const currency_contract_address = await contract_currencies[
        currency as keyof typeof contract_currencies
    ]()
    await ROLE_CONTRACT.buyRoleB2C(address, role, intervals, currency_contract_address)
}

const approveTokens = async (
    currency: string,
    signer: Signer,
    token_amount: number
) => {
    await initContract(signer)
    const currency_contract_address = await contract_currencies[
        currency as keyof typeof contract_currencies
    ]()
    const approve_abi = [
        'function approve(address spender, uint256 amount) public virtual override returns (bool)',
    ]
    const token_contract = new Contract(
        currency_contract_address,
        approve_abi,
        signer
    )
    console.log(Number(BigNumber.from(token_amount).mul(1000000)))
    return token_contract.approve(ROLE_CONTRACT_ADDRESS, BigNumber.from(token_amount).mul(1000000))
}

export { initContract, approveTokens, buyRoleB2B, buyRoleB2C }
