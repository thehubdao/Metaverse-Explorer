import React from "react";
import { Activity } from "../dashboard/Activity";
import { Inventory } from "../dashboard/Inventory";
import { Badges } from "../dashboard/Badges";
import { Leaderboard } from "../dashboard/Leaderboard";
import { LevelProgress } from "../dashboard/LevelProgress";
import WalletButton from "../WalletButton";
import { Toaster } from "react-hot-toast";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="container-dashboard">
        <div className="item-a">
          <h1>METAVERSE</h1>
          <h2 className="ml-10">LOYALTY MODULE</h2>
        </div>
        <iframe
          className="item-b"
          id="frame"
          src="https://avatar-generator-metagamehub.vercel.app/?campaign=mlp&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true"
          width="100%"
          height="100%"
        ></iframe>
        {/* https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland&bg=rgb(17%2017%2017%20/%20var(--tw-bg-opacity))&ov=true */}
        <div className="item-c">
          <WalletButton />
        </div>
        <div className="item-d">
          <Badges />
        </div>
        <div className="item-e">
          <Inventory />
        </div>
        <div className="item-f">
          <Leaderboard />
        </div>
        <div className="item-g">
          <LevelProgress />
        </div>
        <div className="item-h">
          <Activity />
        </div>
      </div>
    </>
  );
};

export default Dashboard;