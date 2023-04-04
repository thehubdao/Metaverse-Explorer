// WEB 3 AUTH imports
import { Web3Auth } from '@web3auth/modal'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base'
import jwtDecode from 'jwt-decode'

import { Chains } from '../../lib/chains'
const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`
import RPC from '../api/etherRPC' // for using web3.js
import { Signer } from 'ethers'
import { fetchNonce, sendSignedNonce } from '../login'
import { verifyMessage } from 'ethers/lib/utils.js'
import axios from 'axios'

class Web3authService {
    private web3auth: Web3Auth | null = null
    private web3authProvider: SafeEventEmitterProvider | null = null
    private token: string | null = null
    private B2BRoles: [any] | null = null
    private B2CRole: any | null = null

    public get getWeb3Auth(): Web3Auth | null {
        return this.web3auth
    }
    public get getB2Broles(): [any] | null {
        return this.B2BRoles
    }
    public get getB2CRole(): any | null {
        return this.B2CRole
    }
    public get getToken(): string | null {
        return this.token
    }

    getUserInfo = async () => {
        if (!this.web3auth) {
            console.log('web3auth not initialized yet')
            return
        }
        const user = await this.web3auth.getUserInfo()
        return user
    }

    signMessage = async (message: string) => {
        if (!this.web3authProvider) {
            console.log('provider not initialized yet')
            return
        }
        const rpc = new RPC(this.web3authProvider)
        const signedMessage = await rpc.signMessage(message)
        return `${signedMessage}`
    }
    isPremiumUser = () => {
        if (!this.B2CRole) return false
        if (this.B2CRole.role != 1) return false
        if (this.B2CRole.endDate <= Math.floor(Date.now() / 1000)) return false
        return true
    }

    initWeb3auth = async () => {
        try {
            const web3authInit = new Web3Auth({
                clientId,
                web3AuthNetwork: 'cyan',
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: '0x89',
                    rpcTarget: Chains.MATIC_MAINNET.rpcUrl, // This is the private RPC
                },
            })
            await web3authInit.initModal()

            this.web3auth = web3authInit
        } catch (error) {
            console.error(error)
        }
    }


    setUserData = async (token: string) => {
        const decodedToken = await this.decodeToken(token)
        const { B2BRoles, B2CRoles } = decodedToken
        console.log(B2CRoles)
        this.B2BRoles = B2BRoles
        this.B2CRole = B2CRoles

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

    connectWeb3Auth = async (signer: Signer) => {
        const address = await signer.getAddress()
        try {
            const { nonce } = await fetchNonce(address)
            // Create Msg
            const msgToSign = `${nonce}`
            // Make user Sign it (React Dev Mode makes component refresh twice, so it will make user sign twice, this shouldn't happen once in production)
            const signedNonce = await signer.signMessage(msgToSign)
            // Verify Msg in frontend first
            const signedAddress = verifyMessage(msgToSign, signedNonce)
            if (signedAddress !== address) {
                return
            }
            // JWT request to API
            const tokenData = await sendSignedNonce(signedNonce, signedAddress)

            const { accessToken } = tokenData
            // Decode JWT and set Global State
            await this.setUserData(accessToken.token)

            return accessToken
        } catch (e) {
            console.log(e)
            return {}
        }

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
        if (!this.web3auth) return
        axios.get(`${process.env.AUTH_SERVICE}/authService/logout`, { withCredentials: true })
    }
}

const web3authService = new Web3authService()

export default web3authService
