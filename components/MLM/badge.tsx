import React from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";

const Badge = ({ claim, src, badgeNotification, index }: any) => {
  const account = useAccount();

  const claimBadge = () => {
    console.log(">>walletAddress:", account.address);
    console.log(">>eventType:", claim.id);
    const body = { walletAddress: account.address, eventType: claim.id };
    axios
      .post(
        process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
          "/db/claimIndividualBadges",
        body
      )
      .then(() => {
        badgeNotification(claim.id);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
          >
            <div className="flex-1 w-0 px-2 m-2">
              <div className="flex items-center">
                <img className="h-[4.5rem] w-14" src={src} alt="badge" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">You claim your badge!</p>
                  <p className="mt-1 text-sm">
                    The Badge have been added to your wallet
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
      });
  };

  console.log(
    "Link to OpenSea  ",
    "opensea.io/es/assets/matic/" +
      process.env.REACT_APP_BADGES_CONTRACT_ADDRESS +
      "/" +
      index
  );
  return (
    <>
      <div
        className="flex flex-col w-14 h-[5rem] mx-[0.45rem] my-2 text-center"
        key={src}
      >
        {src != "/BadgeBlocked.svg" && (
          <a
            className="h-[4.5rem] w-full absolute z-50"
            href={`http://opensea.io/es/assets/matic/${process.env.REACT_APP_BADGES_CONTRACT_ADDRESS}/${index}`}
            target="_blank"
          ></a>
        )}
        <img
          className="h-[4.5rem] w-full relative z-40"
          src={src}
          alt="badge"
        />
        <div className="mt-2 h-7">
          {src === "/BadgeBlocked.svg" && claim?.toClaim == true && (
            <button
              className="z-10 border-solid border-2 w-full h-full text-[12px] rounded-xl border-white hover:border-tahiti hover:text-tahiti"
              onClick={() => {
                claimBadge();
              }}
            >
              Claim
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Badge;
