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
  connectWeb3Auth,
  disconnectWeb3Auth,
} from "../backend/ConnecWeb3Auth";

// Components
import OvalButton from "./General/Buttons/OvalButton";

// Interfaces
interface ILogin {
  chainId: any
  addressFromJwt: string
  roles: undefined[] | string[]
}

export default function InitWeb3Connect() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const dispatch = useAppDispatch()
  const { address: addressFromRedux } = useAppSelector((state) => state.account)

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

  const login = async () => {
    let { chainId, addressFromJwt, roles }: ILogin = await connectWeb3Auth(web3auth, setProvider, addressFromRedux)
    if (chainId) dispatch(setChain(chainId))
    if (addressFromJwt) dispatch(setAddress(addressFromJwt))
    if (roles[0]) dispatch(setRole(roles[0]))
  }
  
  return (
    <>
      {
        provider
          ? (
            <div className="flex flex-row">
              <div>
                ChainId
              </div>
              <OvalButton
                buttonFunction={() => {
                  disconnectWeb3Auth(web3auth, setProvider)
                  dispatch(disconnect())
                }}
                label={`${addressFromRedux ? addressFromRedux : 'Loading ...'}`}
                backgroundColorClass={'bg-white'}
              />
            </div>
          ) : (
            <OvalButton
              buttonFunction={() => login()}
              label={'User Connect'}
              icon={<FaWallet className={`text-2xl z-10 text-grey-content pr-1 font-bold`} />}
              backgroundColorClass={'bg-white'}
            />
          )
      }
    </>
  )
}