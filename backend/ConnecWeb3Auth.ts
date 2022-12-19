import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";
import jwtDecode from 'jwt-decode'

import RPC from "./api/etherRPC"; // for using web3.js
import { verifyMessage } from 'ethers/lib/utils'
import { fetchNonce, sendSignedNonce } from './login'

const getChainId = async (provider: SafeEventEmitterProvider | null) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const chainId = await rpc.getChainId();
  return (chainId);
};

const getAccounts = async (provider: SafeEventEmitterProvider | null) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  return (address);
};

const signMessage = async (provider: SafeEventEmitterProvider | null, message: string) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return '';
  }
  const rpc = new RPC(provider);
  const signedMessage = await rpc.signMessage(message);
  return `${signedMessage}`;
};

export const connectWeb3Auth = async (
  web3auth: Web3Auth | null,
  setProvider: Function,
  addressFromRedux: string | undefined
) => {

  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return { chainId: '', addressFromJwt: '', roles: [] };
  }
  const web3authProvider = await web3auth.connect();
  const chainId = await getChainId(web3authProvider)
  const address = await getAccounts(web3authProvider)

  if (address === addressFromRedux) return { chainId: '', addressFromJwt: '', roles: [] }

  try {
    setProvider(web3authProvider);
    // First Nonce Request to API
    const { nonce } = await fetchNonce(address)
    // Create Msg
    const msgToSign = 'Signing nonce: ' + nonce
    // Make user Sign it (React Dev Mode makes component refresh twice, so it will make user sign twice, this shouldn't happen once in production)
    const signedNonce = await signMessage(web3authProvider, msgToSign)
    // Verify Msg in frontend first
    const signedAddress = verifyMessage(msgToSign, signedNonce)
    if (signedAddress !== address) {
      window.location.reload()
      return { chainId: '', addressFromJwt: '', roles: [] }
    }
    // JWT request to API
    const { token } = await sendSignedNonce(signedNonce, signedAddress)
    // Decode JWT and set Global State
    const { address: addressFromJwt, roles } = jwtDecode<{ address: string; roles: undefined[] | string[] }>(token)
    console.log("Logged in Successfully!");
    return { chainId, addressFromJwt, roles }
  } catch (e) {
    console.log(e)
    setProvider(undefined)
    return { chainId, addressFromJwt: '', roles: [] }
  }
};

export const authenticateUser = async (web3auth: Web3Auth | null) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const idToken = await web3auth.authenticateUser();
  console.log(idToken);
};

export const getUserInfo = async (web3auth: Web3Auth | null) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  console.log(user);
};

export const disconnectWeb3Auth = async (web3auth: Web3Auth | null, setProvider: Function) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
};