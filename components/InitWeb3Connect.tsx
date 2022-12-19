import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { FaWallet } from "react-icons/fa";

import { Chains } from "../lib/chains";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { disconnect, setAddress, setChain, setRole } from '../state/account'

// WEB 3 AUTH imports
const clientId = `${process.env.WEB3AUTH_CLIENT_ID}`
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import {
  authenticateUser,
  connectWeb3Auth,
  disconnectWeb3Auth,
  getUserInfo
} from "../backend/ConnecWeb3Auth";

// Components
import OvalButton from "./General/Buttons/OvalButton";

export default function InitWeb3Connect() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    /* const dispatch = useAppDispatch()
    const { address: addressFromRedux } = useAppSelector((state) => state.account) */

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: Chains.ETHEREUM_MAINNET.rpcUrl, // This is the public RPC we have added, please pass on your own endpoint while creating an app
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

  return (
    <>
      {
        provider
          ? (
            <>
              <OvalButton
                buttonFunction={() => authenticateUser(web3auth)}
                label={'Get info'}
                icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
              />
              <OvalButton
                buttonFunction={() => disconnectWeb3Auth(web3auth, setProvider)}
                label={'User Disconnect'}
                icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
              />
            </>
          ) : (
            <OvalButton
              buttonFunction={() => connectWeb3Auth(web3auth, setProvider)}
              label={'User Connect'}
              icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
            />
          )
      }
    </>
  )
}