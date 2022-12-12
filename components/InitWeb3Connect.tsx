import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`
import { FaWallet } from "react-icons/fa";

// Adapters
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import WhiteOvalButton from "./General/Buttons/WhiteOvalButton";

export default function InitWeb3Connect() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({ clientId });
        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);
        await web3auth.initModal();
        setWeb3auth(web3auth);
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log("Logged in Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  return (
    <>
      {
        provider
          ? (
            <button onClick={() => logout()}>User Disconnect</button>
          ) : (
            <WhiteOvalButton
              buttonFunction={login}
              label={'User Connect'}
              icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
            />
          )
      }
    </>
  )
}