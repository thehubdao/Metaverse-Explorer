import { Contract } from 'ethers'

const mlb_contract_address = process.env.MLM_CONTRACT_ADDRESS!

const abi_mlp = [
    "function addPoints(address who, uint256 amount, bytes signature)",
    "function getLastNonceUsed(address user) view returns(uint256)",
    "function balanceOfPoints(address account) view returns(uint256)",
    "function level(address who) view returns(uint256)"
 ]
export const getBalance = async (walletAddress: any, provider: any) => {

    const mlb_contract = new Contract(mlb_contract_address, abi_mlp, provider)
    const balance = await mlb_contract.balanceOfPoints(walletAddress) 
    return balance
}

export const getLevel = async (walletAddress: any, provider: any) => {
    const mlb_contract = new Contract(mlb_contract_address, abi_mlp, provider)
    const balance = await mlb_contract.level(walletAddress) 
    return balance
}
