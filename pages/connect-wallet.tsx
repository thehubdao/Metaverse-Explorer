import { NextPage } from "next"
import { useCallback } from "react"
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { ParticlesTwo } from "../lib/particles-config"
import Web3Auth from "@web3auth/modal";

const ConnectWalletView: NextPage = () => {
  const particlesInit = useCallback(async (engine) => { await loadFull(engine) }, [])
  const particlesLoaded = useCallback(async (container) => { }, [])
  let particlesOptions: any = ParticlesTwo

  //const web3Auth = new Web3Auth({})

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="particles"
      />
      <div className="absolute justify-center items-center text-base text-black z-10">
        <div className="text-center">
          <h1>METAVERSE APP</h1>
          <h2 className="pb-20">LOGIN</h2>
          <p className=" text-black w-[30rem] min-h-full pb-14 ">
            En esta seccion se colocaria el login Web3Auth (pero es un modal)
          </p>
          {/* <ConnectionButton /> */}
        </div>
        <div className="flex flex-col pb-10"></div>
      </div>
      {/* <Web3Modal
        config={{
          projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
          theme: 'dark',
          accentColor: 'default',
          ethereum: {
            appName: 'web3Modal',
            autoConnect: true,
            chains: [chains.polygon],
          },
        }}
      /> */}
    </>
  )
}

export default ConnectWalletView