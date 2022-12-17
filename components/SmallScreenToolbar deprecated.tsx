import "animate.css"
import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi"
import { MdClose } from "react-icons/md"

import NavItem from './NavItem';
import NetworkButton from "./NetworkButton"
import WalletButton from "./WalletButton"


const SmallScreenToolbar = ({ onWalletClick, disconnectWallet, web3Provider, chainId }: any) => {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <>
            {openSidebar && <div onClick={() => setOpenSidebar(false)} className="fixed top-0 left-0 h-screen w-screen bg-grey-bone bg-opacity-30 backdrop-filter backdrop-blur-sm z-20 overflow-hidden" />}

            <div className="flex space-x-2 xs:space-x-4 sm:space-x-10 xl:hidden h-16 sm:h-20 md:h-24 w-full items-center justify-between p-5 z-30 fixed top-0 left-0 backdrop-filter backdrop-blur-3xl">

                <div onClick={() => setOpenSidebar(false)} className="flex space-x-2 items-center flex-grow justify-end">
                    {web3Provider && chainId && <NetworkButton provider={web3Provider.provider} chainId={chainId} />}
                    <WalletButton onClick={onWalletClick} disconnectWallet={disconnectWallet} />
                </div>

                <div className={`transform hover:scale-110 transition duration-300 ease-in-out text-grey-content cursor-pointer`} onClick={() => setOpenSidebar(!openSidebar)}>
                    {openSidebar ? <MdClose size={34} /> : <HiMenuAlt4 size={34} />}
                </div>

            </div>

            <nav className={`${openSidebar ? "animate__animated animate__fadeInRight" : "animate__animated animate__fadeOutUp hidden"} p-5 pt-20 md:pt-32 z-20 top-0 right-0 fixed h-screen backdrop-filter backdrop-blur-3xl bg-gery-bone bg-opacity-30 flex flex-col justify-between items-center`} >
                <div onClick={() => setOpenSidebar(!openSidebar)} className="space-y-1 md:space-y-4 flex flex-col w-full">
                            <NavItem text="Home" link="/" />
							<NavItem text="Land V" link="/valuation" />
							<NavItem text="NFT V" link="/nftValuation" />
							<NavItem text="Swap" link="/swap" />
							<NavItem text="Liquidity" link="/liquidity" />
							<NavItem text="Stake" link="/stake" />
							<NavItem
								text="Gov"
								link="https://snapshot.org/#/metagamehub.eth"
							/>
                </div>

                {/* <div className="flex flex-col space-y-3 md:hidden mb-12"> */}
                {/* <NetworkButton /> */}
                {/* <WalletButton onClick={onWalletClick} disconnectWallet={disconnectWallet} />
                </div> */}
            </nav>




        </>
    )
}


export default SmallScreenToolbar
