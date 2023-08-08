import { FaWallet } from "react-icons/fa"
import { Login } from "../../component/login.component"

export default function ConnectButtonUI (){
    return (
        <div className={`relative w-fit mt-6 rounded-2xl cursor-pointer bg-white flex flex-col items-center px-4 py-3 gap-2 font-normal shadow-xl float-right`}>
            <div className='flex font-bold gap-1'>
            <FaWallet className={`text-2xl z-10 text-nm-dm-icons pr-1 font-bold`} />
            <Login />
          </div>
        </div>
    )
}
