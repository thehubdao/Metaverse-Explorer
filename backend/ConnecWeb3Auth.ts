import { Web3Auth } from "@web3auth/modal";

export const connectWeb3Auth = async (web3auth: Web3Auth | null, setProvider: Function) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();
  setProvider(web3authProvider);
  console.log("Logged in Successfully!");
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