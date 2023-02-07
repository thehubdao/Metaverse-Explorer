import { useState } from "react"
import { connect } from "../state/account"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { ellipseAddress } from "../lib/utilities"
import { FaWallet } from "react-icons/fa"

const WalletButton = ({ onClick, disconnectWallet }: any) => {

    const { address } = useAppSelector(state => state.account)


    return (
        <>
            <div className={`relative ${address && "group"}`}>
                <div onClick={address ? undefined : onClick} className="group-hover:hidden w-34 xs:w-36 sm:w-44 md:w-52 flex items-center justify-center cursor-pointer text-grey-content font-plus font-bold sm:text-base md:text-lg p-1.5 sm:p-2 md:p-3">
                    <FaWallet className={`text-2xl z-10 text-grey-icon pr-1`}/>
                    <div className="h-full w-full absolute bg-grey-lightest shadow-md  rounded-2xl" />
                    <span className="pt-1 z-10 font-plus font-bold text-lg">{address ? ellipseAddress(address) : "Connect Wallet"}</span>
                </div>
                <div onClick={disconnectWallet} className="group-hover:flex w-34 xs:w-36 sm:w-44 md:w-52 hidden items-center justify-center cursor-pointer text-grey-content font-plus font-bold sm:text-base md:text-lg  p-1.5 sm:p-2 md:p-3">
                    <FaWallet className={`text-2xl z-10 text-grey-icon pr-1`}/>
                    <div className="h-full w-full absolute bg-grey-lightest shadow-md rounded-2xl"/>
                    <span className="pt-1 z-10 font-plus font-bold text-lg">Disconnect</span>
                </div>
            </div>
        </>
    )
}


export default WalletButton
