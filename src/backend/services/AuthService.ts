import axios from 'axios'
import { WalletClient, verifyMessage, GetAddressesReturnType } from 'viem'
import { TokenData } from '../../interfaces/common.interface';

class AuthService {
    
    connect = async (client: WalletClient) => {
        const accounts = await client.getAddresses();
        try {
            const { nonce } = await this.fetchNonce(accounts);
            const message = `${nonce ?? ""}`;
            const signature = await client.signMessage({
                account: accounts[0],
                message: message,
            });
            const signedAddress = await verifyMessage({
                address: accounts[0],
                message: message,
                signature: signature
            });
            if (!signedAddress) return;
            const tokenData = await this.sendSignedNonce(accounts[0], signature);
            return tokenData;
        } catch (e) {
            console.error(e);
        }
    }

    fetchNonce = async (address: GetAddressesReturnType) => {
        const nonceRes = await fetch(
            `${process.env.AUTH_SERVICE ?? ""}/authService/getNonce?address=${address}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return await nonceRes.json();
    }

    sendSignedNonce = async (address: string, signedNonce: string) => {
        const loginRes = await axios.post(
            `${process.env.AUTH_SERVICE ?? ""}/authService/loginWallet?address=${address}&signature=${signedNonce}`,
            {},
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const accessToken : TokenData = await loginRes.data;
        return accessToken;
    }
}

const authService = new AuthService()

export default authService
