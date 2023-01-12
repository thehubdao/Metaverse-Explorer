import type { NextPage } from "next";
import React, { useEffect } from "react";
import { ConnectionButton } from "../../components/MLM/auth/ConnectionButton";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { ParticlesThree } from "../../lib/MLM/particles-config";
import { useRouter } from "next/router";

const Auth: NextPage = () => {
  const router = useRouter();
  const account = useAccount();
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container: any) => {}, []);

  useEffect(() => {
    if (account && account.isConnected) {
      router.push("/mlm/dashboard");
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
          <h1 className="h1-mlm">METAVERSE</h1>
          <h2 className="h2-mlm ml-10">LOYALTY MODULE</h2>
          <p className="p-mlm font-body text-white w-[30rem] min-h-full pb-14 ">
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

export default Auth; 
