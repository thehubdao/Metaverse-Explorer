import React, { useState } from "react";
import { WalletModal } from "../MLM/modals/WalletModal";
import { useAccount } from "wagmi";

const WalletButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const account = useAccount();

  return (
    <>
      {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />}
      <div className="flex justify-center self-center regularButton col-start-3 row-span-1 text-center relative mx-auto py-4 max-w-[15rem]">
        <button
          className="hover:border-tahiti hover:text-tahiti"
          onClick={() => setOpenModal(true)}
        >
          <p className="px-6 truncate">{account.address}</p>
        </button>
      </div>
    </>
  );
};

export default WalletButton;
