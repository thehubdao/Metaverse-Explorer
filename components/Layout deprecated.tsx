import "animate.css";
import { useState } from "react";

import useConnectWeb3 from "../backend/connectWeb3";
import { useAppSelector } from "../state/hooks";

import NavItem from "./NavItem deprecated";
import WalletButton from "./WalletButton";
import SmallScreenToolbar from "./SmallScreenToolbar deprecated";
import WalletModal from "./WalletModal";
import NetworkButton from "./NetworkButton";
import { OptimizedImage } from "./General";

const Layout = ({ children }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const { chainId } = useAppSelector((state) => state.account);
  const { web3Provider, disconnectWallet } = useConnectWeb3();

  return (
    <>
      <div className="flex flex-row  xl:h-screen pt-0 bg-white overflow-hidden">
        {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />}

        {/* <div className="h-72 w-72 rounded-full border bg-gradient-to-br from-blue-500 to-pink-600 blur-3xl fixed top-0 left-0 xl:top-20 xl:left-0.15 2xl:left-0.125 opacity-80" />

                <div className="h-72 w-72 rounded-tl-full border bg-gradient-to-br from-blue-500 to-pink-600 blur-3xl fixed bottom-0 right-0 opacity-50" /> */}

        {/* Responsive menu */}
        <SmallScreenToolbar
          onWalletClick={() => setOpenModal(true)}
          disconnectWallet={disconnectWallet}
          web3Provider={web3Provider}
          chainId={chainId}
        />

        {/* Menu */}
        <div className="hidden xl:flex min-h-[10vh] bg-green-400">
          <div className="hidden lg:flex xl:flex  max-w-md min-w-max flex-col items-center pt-9 px-8">
            <a
              href="/"
              className="hover:scale-110 transition-all duration-500 ease-in-out"
            >
              <OptimizedImage
                src="/images/mgh_logo.svg"
                height={90}
                width={90}
              />
            </a>
            <div className="space-y-6 flex flex-col pt-6">
              <NavItem text="HOME" link="/" />
              <NavItem text="LAND Valuation" link="/valuation" />
              <NavItem text="NFT Valuation" link="/nftValuation" />
              <NavItem text="SWAP" link="/swap" />
              <NavItem text="LIQUIDITY" link="/liquidity" />
              <NavItem text="STAKE" link="/stake" />
              <NavItem
                text="Governance"
                link="https://snapshot.org/#/metagamehub.eth"
              />
              <NavItem
                text="MLM"
                link="/mlm"
              />
              <NavItem
                text="Avatar"
                link="https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland"
              />
            </div>
          </div>
        </div>

        {/* layout wrapper */}
        <div className="hidden lg:flex lg:flex-col space-x-10 w-full p-5 bg-white overflow-hidden">
          {/* wallet connection */}
          <div className="flex space-x-3 justify-end pb-3">
            {web3Provider && chainId && (
              <NetworkButton
                provider={web3Provider.provider}
                chainId={chainId}
              />
            )}
            <WalletButton
              onClick={() => setOpenModal(true)}
              disconnectWallet={disconnectWallet}
            />
          </div>
              <div className="bg-red-500">
                hola
              </div>
          <main className="z-10 w-full pt-1 sm:pt-2 md:pt-3 xl:pt-5 p-2 xs:p-3 sm:p-5 flex items-start justify-center flex-grow overflow-auto animate-none xl:animate__animated animate__slideInRight self-end bg-[#FFF] scrollbar">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
