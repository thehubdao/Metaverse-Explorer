import React, { useState, useEffect } from "react";
import { StatsModal } from "../modals/StatsModal";
import axios from "axios";

export const Leaderboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [leaderboards, setLeaderboards] = useState<any>();
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    const getLeaderboards = async () => {
      setLeaderboards(
        (
          await axios.get(
            process.env.MLM_BACKEND_URL + "/db/read-top"
          )
        ).data
      );
    };
    getLeaderboards();
  }, []);

  const chargeModal = (number: number) => {
    setOpenModal(true);
    setLeaderboard(leaderboards[number]);
  };

  return (
    <>
      {openModal && (
        <StatsModal
          onDismiss={() => setOpenModal(false)}
          leaderboard={leaderboard}
        />
      )}
      <div className="flex flex-col text-white max-w-full space-y-3">
        <h2 className="text-2xl">LEADERBOARD</h2>
        <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 space-x-4 justify-between">
          {leaderboards && (
            <p className="p-mlm truncate">1. {leaderboards[0]["?column?"]}</p>
          )}
          <button
            className="hover:border-tahiti hover:text-tahiti"
            onClick={() => chargeModal(0)}
          >
            {">"}
          </button>
        </div>
        <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          {leaderboards && (
            <p className="p-mlm truncate">2. {leaderboards[1]["?column?"]}</p>
          )}
          <button
            className="hover:border-tahiti hover:text-tahiti"
            onClick={() => chargeModal(1)}
          >
            {">"}
          </button>
        </div>
        <div className="flex h-10 bg-grey rounded-2xl py-2 px-4 justify-between">
          {leaderboards && (
            <p className="p-mlm truncate">3. {leaderboards[2]["?column?"]}</p>
          )}
          <button
            className="hover:border-tahiti hover:text-tahiti"
            onClick={() => chargeModal(2)}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};
