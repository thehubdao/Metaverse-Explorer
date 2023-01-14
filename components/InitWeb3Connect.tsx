import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAccount } from 'wagmi'

// web3auth service
import web3authService from '../backend/services/Web3authService'

// Components
import OvalButton from './General/Buttons/OvalButton'

export default function InitWeb3Connect() {
    const [isInit, setIsInit] = useState(false)
    const { address } = useAccount()

    const login = async () => {
        await web3authService.connectWeb3Auth()
    }

    const logout = async () => {
        await web3authService.disconnectWeb3Auth()
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
