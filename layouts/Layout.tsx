import "animate.css";
import { useState } from "react";

import useConnectWeb3 from "../backend/connectWeb3";
import { useAppSelector } from "../state/hooks";

import Sidebar from "../components/Sidebar";
import WalletButton from "../components/WalletButton";
import WalletModal from "../components/WalletModal";
import NetworkButton from "../components/NetworkButton";
import { OptimizedImage } from "../components/General";

interface LayoutProps  { 
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  const [openModal, setOpenModal] = useState(false);
  const { chainId } = useAppSelector((state) => state.account);
  const { web3Provider, disconnectWallet } = useConnectWeb3();

  return (
    <div className="font-plus text-grey-content w-screen">
      {/* Page wrapper */}
      <main className="w-full min-h-screen pl-24">
        {children}
      </main>
      {/* Wallet connection wrapper */}
      <div className="absolute top-0 right-0">
        wallet connection
      </div>
      {/* Sidebar wrapper */}
      <div className="fixed inset-0 w-24">
        <Sidebar list={[{url: '/swap', label: 'test', icon: 'a'}]} />
      </div>
    </div>
  );
};
