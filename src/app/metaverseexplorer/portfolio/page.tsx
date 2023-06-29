import FooterUI from "../../ui/footer.ui";
import IsLoginUI from "../../ui/isLogin.ui";


export default function Portfolio (){
    const isConnected = false
    return (
        <>
        
            {!isConnected ?
            <IsLoginUI message="Please log in to show your portfolio"/>
            :
            <>
                <div className="flex items-center justify-between p-8 space-x-20 mt-10 px-20">
                    <div className="flex flex-col space-y-3 max-w-2xl text-nm-dm-icons">
                        <p className="text-2xl font-semibold">Description</p>
                        <p className="text-sm">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
                    </div>
                    <div className="flex space-x-8 w-full items-stretch justify-end max-w-2xl min-w-max">
                        <div className="flex flex-col space-y-5 items-center justify-end shadow-relief-32 py-3 px-7 rounded-3xl bg-nm-fill">
                            <p className=" font-black text-3xl">0</p>
                            <p className="text-sm">Total LANDs owned</p>
                        </div>

                        <div className="flex flex-col space-y-2 items-center shadow-relief-32 py-3 px-10 rounded-3xl bg-nm-fill">
                            <div className=" font-black text-2xl">
                                
                            </div>
                            <p className="text-sm">Total Value worth</p>
                        </div>
                    </div>
                </div>
            </>
            }
            <FooterUI/>
        </>
    )
}