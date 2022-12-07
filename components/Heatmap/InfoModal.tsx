const InfoModal = ({ onDismiss, name, description }: any) => {

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50">
            <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
            <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadowDiv bg-white text-center p-5 space-y-10 rounded-xl border border-white border-opacity-20  bg-opacity-20 backdrop-filter backdrop-blur-xl text-gray-200">
                <p className="text-3xl font-plus font-medium">About {name}</p>
                <div className="flex flex-col space-y-5 font-plus">
                    <p>{description}</p>
                </div>

                <p onClick={onDismiss} className="cursor-pointer max-w-max self-center font-medium font-plus text-white">Close</p>
            </div>
        </div>

    )
}

export default InfoModal