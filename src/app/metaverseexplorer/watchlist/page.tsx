import IsLoginUI from "../../ui/isLogin.ui"

export default function Watchlist(){
    const isConnected = false
    return (
        <>
        {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist"/>
        :
        <>
            <h1>this is watchlist</h1>
        </>
        }
        </>
    )
}