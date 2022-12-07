import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"
import { MdOutlineContentCopy } from "react-icons/md"
import { HiOutlineExternalLink } from "react-icons/hi"

import { ellipseAddress, getChainData } from "../lib/utilities"


const TransactionModal = ({ onDismiss, loading, success, hash, chainId }: any) => {
    const blockExplorer = getChainData(chainId)

    const link = blockExplorer?.blockExplorer + "/tx/" + hash

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50">
            <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
            <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-center shadow-dark text-center p-5 pt-10 space-y-10 rounded-xl border border-opacity-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl text-gray-200">
                {loading &&
                    <><img src="/images/mgh_logo.png" className={` h-24 w-24 logo`} />
                        <p className="text-3xl text-blue-400 font-medium text-center">Processing Transaction</p></>
                }
                {!loading && (success ? (
                    <><BsCheckCircleFill className="text-8xl text-green-400" />
                        <p className="text-3xl text-green-400 font-medium text-center">Success</p></>
                ) : (
                    <><BsFillXCircleFill className="text-8xl text-red-500" />
                        <p className="text-3xl text-red-500 font-medium text-center">Error</p></>
                ))}

                <div className="flex items-center">
                    <p className="text-2xl text-gray-200 font-medium text-center pt-1 mr-8">{ellipseAddress(hash)}</p>
                    <div onClick={()=>navigator.clipboard.writeText(hash)} className="rounded-full shadow-button p-2">
                        <MdOutlineContentCopy className="text-2xl text-gray-200" />
                    </div>
                    <a href={link} target="_blank" className="rounded-full shadow-button p-2 ml-4">
                        <HiOutlineExternalLink className="text-2xl text-gray-200" />
                    </a>
                </div>

                <p onClick={onDismiss} className="cursor-pointer max-w-max self-center font-medium text-gray-400 hover:text-gray-200">Close</p>
            </div>
        </div>
    )
}

export default TransactionModal
