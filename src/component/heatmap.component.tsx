import FooterUI from "../ui/footer.ui"
import IsLoginUI from "../ui/isLogin.ui"

export default function HeatmapComponent (){
    const isConnected = false
    return(
        <>
        {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool"/>
        :
        <>
            <h1>this is heatmap</h1>
        </>
        }
        <FooterUI/>
        </>
    )
}