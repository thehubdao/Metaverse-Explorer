import axios from 'axios'
import { WalletClient, verifyMessage } from 'viem'
import { TokenData } from '../../interfaces/common.interface';
import { Module } from '../../enums/logging.enum';
import { LogError } from '../../utils/logging.util';

interface nonceResponse {
    nonce: number
}

class AuthService {
    
    connect = async (client: WalletClient) => {
        const accounts = await client.getAddresses();
        try {
            const nonceResponse = await this.fetchNonce(accounts[0]);
            const message = `${nonceResponse.nonce ?? ""}`;
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
            LogError(Module.AuthService, "Auth service connect has failed", e);
        }
    }

    fetchNonce = async (address: string) => {
        const nonceRes = await fetch(
            `${process.env.AUTH_SERVICE ?? ""}/authService/getNonce?address=${address}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return (await nonceRes.json()) as nonceResponse;
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
        const accessToken = (await loginRes.data) as TokenData;
        return accessToken;
    }
}

const authService = new AuthService()

export default authService
