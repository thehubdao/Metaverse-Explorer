// WEB 3 AUTH imports
import { Web3Auth } from '@web3auth/modal'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base'
import jwtDecode from 'jwt-decode'

import { Chains } from '../../lib/chains'
const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`
import RPC from '../api/etherRPC' // for using web3.js
import { verifyMessage } from 'ethers/lib/utils'
import { fetchNonce, sendSignedNonce } from '../login'
import { Signer } from 'ethers'

class Web3authService {
    private web3auth: Web3Auth | null = null
    private web3authProvider: SafeEventEmitterProvider | null = null
    private token: string | null = null
    private B2BRoles: [any] | null = null
    private B2CRoles: [any] | null = null

    public get getWeb3Auth(): Web3Auth | null {
        return this.web3auth
    }
    public get getB2Broles(): [any] | null {
        return this.B2BRoles
    }
    public get getB2CRoles(): [any] | null {
        return this.B2CRoles
    }
    public get getToken():string | null {
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

    initWeb3auth = async () => {
        try {
            const web3authInit = new Web3Auth({
                clientId,

                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: '0x1',
                    rpcTarget: Chains.MATIC_TESTNET.rpcUrl, // This is the private RPC
                },
            })
            await web3authInit.initModal()

            this.web3auth = web3authInit
        } catch (error) {
            console.error(error)
        }
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
            const { token } = await sendSignedNonce(signedNonce, signedAddress)
            // Decode JWT and set Global State
            const { B2BRoles, B2CRoles } = jwtDecode<{
                B2BRoles: any
                B2CRoles: any
            }>(token)
            this.token = token
            this.B2BRoles = B2BRoles
            this.B2CRoles = B2CRoles
        } catch (e) {
            console.log(e)
        }
    }

    disconnectWeb3Auth = async () => {
        if (!this.web3auth) return

        await this.web3auth.logout()
    }
}

const web3authService = new Web3authService()

export default web3authService
