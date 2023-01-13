// WEB 3 AUTH imports
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import jwtDecode from 'jwt-decode'

import { Chains } from "../../lib/chains";
const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`
import RPC from "../api/etherRPC"; // for using web3.js
import { verifyMessage } from 'ethers/lib/utils'
import { fetchNonce, sendSignedNonce } from '../login'

class Web3authService {
  private web3auth: Web3Auth | null = null
  private web3authProvider: SafeEventEmitterProvider | null = null
  private roles: string[] | undefined[] = []
  private isConnected: boolean = false

  // Getters
  public get getRoles(): string[] | undefined[] { return this.roles }
  public get getWeb3Auth(): Web3Auth | null { return this.web3auth }
  public get getIsConnected(): boolean { return this.isConnected }
  getAccounts = async () => {
    if (!this.web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(this.web3authProvider);
    const address = await rpc.getAccounts();
    return (address);
  };

  public getChainId = async () => {
    if (!this.web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(this.web3authProvider);
    const chainId = await rpc.getChainId();
    return (chainId);
  };

  getUserInfo = async () => {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await this.web3auth.getUserInfo();
    return user;
  };

  signMessage = async (message: string) => {
    if (!this.web3authProvider) {
      console.log("provider not initialized yet");
      return '';
    }
    const rpc = new RPC(this.web3authProvider);
    const signedMessage = await rpc.signMessage(message);
    return `${signedMessage}`;
  };

  // Functinals
  initWeb3auth = async () => {
    try {
      const web3authInit = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: Chains.ETHEREUM_MAINNET.rpcUrl, // This is the private RPC
        },
      });
      // adding metamask adapter
      const metamaskAdapter = new MetamaskAdapter({ clientId });
      // it will add/update  the metamask adapter in to web3auth class
      web3authInit.configureAdapter(metamaskAdapter);
      await web3authInit.initModal();
      let web3authProvider = null
      if (web3authInit.provider) { web3authProvider = web3authInit.provider }
      this.web3auth = web3authInit
      this.web3authProvider = web3authProvider
      this.isConnected = await this.getAccounts() ? true : false
    } catch (error) { console.error(error) }
  }

  connectWeb3Auth = async () => {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      this.roles = []
      return
    }

    const web3authProvider = await this.web3auth.connect();
    const address = await this.getAccounts()

    try {
      this.web3authProvider = web3authProvider;
      // First Nonce Request to API
      const { nonce } = await fetchNonce(address)
      // Create Msg
      const msgToSign = 'Signing nonce: ' + nonce
      // Make user Sign it (React Dev Mode makes component refresh twice, so it will make user sign twice, this shouldn't happen once in production)
      const signedNonce = await this.signMessage(msgToSign)
      // Verify Msg in frontend first
      const signedAddress = verifyMessage(msgToSign, signedNonce)
      if (signedAddress !== address) {
        this.roles = []
        return
      }
      // JWT request to API
      const { token } = await sendSignedNonce(signedNonce, signedAddress)
      // Decode JWT and set Global State
      const { address: addressFromJwt, roles } = jwtDecode<{ address: string; roles: undefined[] | string[] }>(token)
      console.log("Logged in Successfully!");
      if (!(await this.getAccounts() == addressFromJwt))
        this.disconnectWeb3Auth()
      this.roles = roles
      this.isConnected = true
    } catch (e) {
      console.log(e)
      this.web3authProvider = null
    } return
  }

  disconnectWeb3Auth = async () => {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await this.web3auth.logout();
    this.isConnected = false
  };
}

const web3authService = new Web3authService()

export default web3authService