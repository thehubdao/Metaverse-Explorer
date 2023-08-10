import IsLoginUI from "../../ui/common/isLogin.ui";

export default function HeatmapComponent() {
  const isConnected = false; //TODO: connect variable from redux login state 
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to use the valuation tool" />
        :
        <>
          <h1>this is heatmap</h1>
        </>
      }
    </>
  )
}