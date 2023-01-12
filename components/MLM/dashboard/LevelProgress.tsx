import React, { useEffect, useState, useRef } from "react";
import { useProvider, useAccount, useSigner, useSwitchNetwork } from "wagmi";
import {
  getBalance as getMLPBalance,
  getLevel as getMLPLevel,
} from "../../../backend/services/MLPContractService";
import axios from "axios";
import toast from "react-hot-toast";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import * as PushAPI from "@pushprotocol/restapi";

export const LevelProgress = () => {
  const provider = useProvider();
  const [balance, setBalance] = useState<any>();
  const [level, setLevel] = useState<any>();
  const mounted = useRef(true);
  const account = useAccount();
  const { switchNetwork } = useSwitchNetwork({
    async onSuccess(data) {
      await PushAPI.channels.subscribe({
        signer: signer as any,
        channelAddress:
          "eip155:1:" + process.env.REACT_APP_CHANNEL_PUSH_ADDRESS,
        userAddress: "eip155:1:" + account.address,
        onSuccess: () => {
          console.log("opt in success");
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
            >
              <div className="flex-1 w-0 px-2">
                <div className="flex items-center">
                  <h2 className="text-md">GOOD</h2>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">SUBSCRIBED</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-white">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        },
        onError: (e) => {
          console.error("opt in error", e.message);
        },
        env: "prod",
      });
      console.log("Success", data);
    },
  });

  const Parentdiv: any = {
    height: "12px",
    width: "100%",
    backgroundColor: "#292929",
    borderRadius: 5,
  };

  const Childdiv: any = {
    height: "100%",
    width: `100%`,
    borderRadius: 5,
    textAlign: "right",
  };

  const progresstext: any = {
    padding: 10,
    fontWeight: 900,
  };

  const { data: signer } = useSigner();

  const subscribed = () => {
    //switchNetwork(1)
    //switchNetwork(137)
  };

  // const unsubscribed = async () => {
  //     await PushAPI.channels.unsubscribe({
  //         signer: signer,
  //          channelAddress: "eip155:1:"+process.env.REACT_APP_CHANNEL_PUSH_ADDRESS,
  //       	userAddress: "eip155:1:"+account.address,
  //         onSuccess: () => {
  //          console.log('opt out success');
  //         },
  //         onError: () => {
  //           console.error('opt out error');
  //         },
  //         env: 'prod'
  //     })
  // }

  useEffect(() => {
    const claimTokens = async () => {
      !mounted.current &&
        (await axios
          .post(
            process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
              "/db/claimTokens?walletAddress=" +
              account.address
          )
          .then(async (res) => {
            let poinsMinted: any;
            if (typeof res.data === "number") {
              poinsMinted = res.data;
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
                >
                  <div className="flex-1 w-0 px-2">
                    <div className="flex items-center">
                      <h2 className="text-md">EXP</h2>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium">Points!</p>
                        <p className="mt-1 text-sm">
                          You have earned {poinsMinted} points and they are
                          currently being minted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-white">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ));
            } else poinsMinted = 0;
            console.log(switchNetwork, toast, "SWITCH");

            switchNetwork &&
              toast.custom(
                (t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
                  >
                    <div className="flex-1 w-0 px-2">
                      <div className="flex items-center">
                        <img
                          className="h-[4.5rem] w-14"
                          src="/images/icons/information.svg"
                        ></img>
                        <div className="ml-3 flex-1">
                          <p className="mt-1 text-sm pb-3">
                            Make sure to subscribe to our Push channel to
                            receive notifactions about your points, badges,
                            upcoming events and more.
                          </p>
                          <button
                            onClick={() => subscribed()}
                            className="z-10 border-solid border-2 w-1/2 h-full text-[12px] rounded-xl border-white mb-3 hover:border-tahiti hover:text-tahiti"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-l border-white">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ),
                { duration: 4000 }
              );
          }));
    };
    provider && claimTokens();
    return () => {
      mounted.current = false;
    };
  }, [account.isConnected, switchNetwork]);

  useEffect(() => {
    const setData = async () => {
      setBalance(await getMLPBalance(account.address, provider));
      setLevel(await getMLPLevel(account.address, provider));
    };
    if (account.isConnected) setData();
  }, [account.address]);

  // tippy("#infoButton", {
  //   content: `The Metaverse Loyalty Points are a type of on-chain reputation token that can be used to acquire wearables on the MGH marketplace, gain access to MGH experiences, and participate in MGH DAO.
  //        They are an integral part of our ecosystem, serving as a measure of reputation and a way to reward users for their contributions and engagement within the platform.`,
  //   theme: "light-border",
  //   placement: "right",
  // });

  return (
    <>
      <div className="flex flex-col">
        {balance && (
          <div className="flex items-end">
            <h2>{`${balance}`}</h2>
            <h3 className="gradientText font-title text-2xl pl-2 pb-1 ">MLP</h3>
            <button
              className="flex mx-2 border-solid border-2 w-6 h-6 text-xs rounded-full cursor-help place-self-center items-center justify-center"
              id="infoButton"
            >
              i
            </button>
          </div>
        )}
        <div style={Parentdiv}>
          <div style={Childdiv} className="gradientbox1">
            <span style={progresstext}></span>
          </div>
        </div>
        {level && (
          <div className="flex ml-auto mr-0">
            <h2 className="gradientText font-title text-xl">LVL</h2>
            <h2 className="pl-2 font-title text-xl">{`${level}`}</h2>
          </div>
        )}
      </div>
    </>
  );
};
