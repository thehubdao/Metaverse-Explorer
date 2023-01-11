import React, { useEffect } from "react";
import { ConnectionButton } from "./ConnectionButton";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { ParticlesThree } from "../../../lib/MLM/particles-config";

export const Auth = () => {
  const navigate = useNavigate();
  const account = useAccount();
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container: any) => {}, []);

  useEffect(() => {
    if (account && account.isConnected) {
      navigate("/dashboard", { replace: true });
    }
  }, [account.isConnected]);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={ParticlesThree}
        className="particles"
      />
      <div className="flex justify-center min-h-screen items-center text-base text-white z-10">
        <div className="text-center">
          <h1>METAVERSE</h1>
          <h2 className="pb-20">LOYALTY MODULE</h2>
          <p className="font-body text-white w-[30rem] min-h-full pb-14 ">
            Social engagement module to incentivize users to participate in the
            Decentraland ecosystem through different onchain and offchain
            activities.
          </p>
          <ConnectionButton />
        </div>
        <div className="flex flex-col pb-10"></div>
      </div>
    </>
  );
};
