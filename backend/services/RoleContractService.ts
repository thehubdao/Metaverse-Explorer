import { Contract, Signer } from 'ethers'

const ROLE_CONTRACT_ADDRESS = process.env.ROLE_CONTRACT_ADDRESS!

const ROLE_CONTRACT_ABI = [
    'function startB2BSubscription(uint16 role, address currency) external',
    'function USDC() external pure returns(address)',
    'function USDT() external pure returns(address)',
    'function rolePrices(uint16, uint256) external view returns(uint256)',
]

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
}

const buyRoleB2C = async (role: number, currency: string, signer: Signer) => {
    const currency_contract_address = await contract_currencies[
        currency as keyof typeof contract_currencies
    ]()
    await ROLE_CONTRACT.startB2BSubscription(role, currency_contract_address)
}

const approveTokens = async (
    currency: string,
    signer: Signer,
    token_amount: number
) => {
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
    return token_contract.approve(ROLE_CONTRACT_ADDRESS, token_amount * 1000000 )
}

export { initContract,approveTokens,buyRoleB2C }
