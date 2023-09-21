import { Contract } from 'ethers'

const badges_contract_address = process.env.BADGES_CONTRACT_ADDRESS!

const abi_badges = [
    'function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])',
    'function mintBadge(address recipient, uint256 id)',
]
export const getBalance = async (walletAddress: any, provider: any) => {

    const badges_contract = new Contract(
        badges_contract_address,
        abi_badges,
        provider
    )
    const balance = await badges_contract.balanceOfBatch(
        [
            walletAddress,
            walletAddress,
            walletAddress,
            walletAddress,
            walletAddress,
        ],
        [1, 2, 3, 4, 5]
    )
    return balance
}
