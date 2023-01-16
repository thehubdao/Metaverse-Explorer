import { Signer } from 'ethers'
import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi'

// web3auth service
import web3authService from '../backend/services/Web3authService'

// Components
import OvalButton from './General/Buttons/OvalButton'

export default function InitWeb3Connect() {
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    const { address } = useAccount()
    const { data: signer } = useSigner({
        async onSettled(signer) {
            await web3authService.connectWeb3Auth(signer as Signer)
        },
    })
    const login = async () => {
        connect({ connector: connectors[0] })
    }

    const logout = async () => {
        disconnect()
    }

    return (
        <>
            {address ? (
                <div className="flex flex-row">
                    <OvalButton
                        buttonFunction={() => logout()}
                        label={`${address ? address : 'Loading ...'}`}
                        backgroundColorClass={'bg-white'}
                    />
                </div>
            ) : (
                <OvalButton
                    buttonFunction={() => login()}
                    label={'User Connect'}
                    icon={
                        <FaWallet
                            className={`text-2xl z-10 text-grey-content pr-1 font-bold`}
                        />
                    }
                    backgroundColorClass={'bg-white'}
                />
            )}
        </>
    )
}
