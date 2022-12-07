import { Tokens } from "../lib/enums"

const TokenInput = ({ name, logo, direction }: any) => {

    return (
        <>
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-1 items-center justify-evenly w-full sm:py-5 py-0 pl-0 sm:pl-1 pr-0 sm:pr-2 rounded-xl max-w-xl">

                <div className=" flex flex-grow md:w-min items-center space-x-1 sm:space-x-3 sm:ml-0 w-full max-w-xs">
                    <img src={logo} className="object-scale-down h-12 sm:h-16 p-1" />
                    <div className="flex flex-col pt-1">
                        <p className="text-gray-500 font-medium">{direction}</p>
                        <p className={`text-gray-200 font-medium ${name === Tokens.MGH_DATA || name === Tokens.MMGH ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}>{name}</p>
                    </div>
                </div>

                <input required id={name} type="numeric" placeholder="0.0" className={`text-right sm:mr-0 flex-initial w-full md:w-min max-w-xs bg-grey-dark shadow-dark hover:shadow-colorbottom focus:shadow-colorbottom bg-opacity-70 text-gray-200 font-medium text-2xl p-3 sm:p-4 pt-4 sm:pt-5 focus:outline-none border border-opacity-10 hover:border-opacity-30 focus:border-opacity-60 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />
            </div>

        </>
    )
}


export default TokenInput
