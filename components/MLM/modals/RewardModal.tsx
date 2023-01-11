import React from "react";

export const RewardModal = ({ onDismiss, activity }: any) => {
  return (
    <>
      <div className="modal text-center text-white">
        <div
          onClick={onDismiss}
          className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur"
        />
        <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark p-5 space-y-7 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
          <h2 className="max-h-[3.3rem] mt-11">REWARD</h2>
          {activity && (
            <p className="gradientText truncate"> {activity["id"]}</p>
          )}

          <div className="stats">
            <div className="stats__text">Event Type</div>
            <div className="stats__data">
              {activity["metadata"]["eventType"]}
            </div>
          </div>
          <div className="stats">
            <div className="stats__text">Points Earned</div>
            <div className="stats__data">{activity["points_earned"]}</div>
          </div>

          <div className="regularButton">
            <button
              // onClick={() => {
              //     axios.post(
              //         process.env
              //             .REACT_APP_WALLETCONNECT_BACKEND_URL +
              //             '/db/claimTokens?walletAddress='+wallet.address,
              //     )
              // }}
              className="my-10"
            >
              Get it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
