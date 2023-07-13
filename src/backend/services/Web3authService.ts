import { verifyMessage } from 'ethers/lib/utils.js'
import axios from 'axios'
import { WalletClient } from 'viem'

class Web3authService {
    private token: string | null = null

    public get getToken(): string | null {
        return this.token
    }

    setUserData = async (token: string) => {
        const decodedToken = await this.decodeToken(token)
    }

    connectWeb3Auth = async (signer: WalletClient) => {
        const [address] = await signer.getAddresses()
        try {
            const { nonce } = await this.fetchNonce(address)
            // Create Msg
            const msgToSign = `${nonce}`
            // Make user Sign it (React Dev Mode makes component refresh twice, so it will make user sign twice, this shouldn't happen once in production)
            const signedNonce = await signer.signMessage({
                account: address,
                message: msgToSign,
            })
            // Verify Msg in frontend first
            const signedAddress = verifyMessage(msgToSign, signedNonce)
            if (signedAddress !== address) {
                return
            }
            // JWT request to API
            const tokenData = await this.sendSignedNonce(signedNonce, signedAddress)

            const { accessToken } = tokenData
            // Decode JWT and set Global State
            await this.setUserData(accessToken.token)

            return accessToken
        } catch (e) {
            console.log(e)
            return {}
        }

    }

    decodeToken = async (token: string) => {
        const decodeRes = await axios.get(
            `${process.env.AUTH_SERVICE}/authService/decodeToken`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `${token}`
                },
            }
        )
        const decodedToken = await decodeRes.data
        return decodedToken
    }

    updateToken = async (token: string) => {
        const updateRes = await axios.get(
            `${process.env.AUTH_SERVICE}/authService/updateToken`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `${token}`
                },
            }
        )
        const newAccessToken = updateRes.data
        await this.setUserData(newAccessToken.token)
        return newAccessToken
    }

    refreshToken = async () => {
        const refreshRes = await axios.get(`${process.env.AUTH_SERVICE}/authService/refreshToken`, { withCredentials: true, })
        const { data: accesToken } = refreshRes
        return accesToken
    }

    disconnectWeb3Auth = async () => {
        axios.get(`${process.env.AUTH_SERVICE}/authService/logout`, { withCredentials: true })
    }

    fetchNonce = async (address: string) => {
        const nonceRes = await fetch(
            `${process.env.AUTH_SERVICE}/authService/getNonce?address=${address}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        return await nonceRes.json()
    }

    sendSignedNonce = async (signedNonce: string, address: string) => {
        const loginRes = await axios.post(
            `${process.env.AUTH_SERVICE}/authService/loginWallet?address=${address}&signature=${signedNonce}`, {},
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },

            }
        )
        const accessToken = await loginRes.data

        return { accessToken }
    }
}

const web3authService = new Web3authService()

export default web3authService
