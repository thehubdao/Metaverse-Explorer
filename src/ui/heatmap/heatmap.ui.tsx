import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm, InformationCardForm } from "../../enums/common.enum";
import EstimatorValuesUI from "./estimatorValues.ui";
// import BoxInformationUI from "./boxInformation.ui";
import TopLandsUI from "./topLands.ui";
import {  Metaverses } from "../../enums/metaverses.enum";
// import HotDealsUI from "./hotDeals/hotDeals.ui";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setHeatmapMetaverse } from "../../state/heatmapSlice";
import { MetaverseGlobalData } from "../../interfaces/itrm/land-valuation.interface";
import { TopPickLand, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";
import TopSellsLandsUI from "./topSellsLands.ui";
import Heatmap2D from "../../components/heatmap/heatmap.component";
import { useRef, useState } from "react";
import { IPredictions, LandTileData } from "../../interfaces/heatmap.interface";
import MapChooseMetaverseUI from "./mapChooseMetaverse.ui";
// import { MapFilter } from "../../types/heatmap/heatmap.type";
// import MapChooseFilterUI from "./mapChooseFilter.ui";
import MapSearchUI from "./mapSearch.ui";
import { LegendFilter } from "../../enums/heatmap/filter.enum";
import MapLegendUI from "./mapLegend.ui";
import MapCardUI from "./mapCard.ui";
import SpecificLandModalUI from "../common/specificLandModal.ui";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { SingleLandAPIResponse } from "../../types/valuationTypes";
import { GetMapLandValuation } from "../../utils/itrm/land-valuation.util";
import { LogError } from "../../utils/logging.util";
import { Module } from "../../enums/logging.enum";
import { convertETHPrediction } from "../../utils/common.util";


const headersPicks = [
  "Land", "Coords", "Current price", "Predicted price", "Gap"
];

const headersSells = [
  "Rank", "Asset", "Price", "Buyer", "Purchased"
];


interface HeatmapUIProps {
  globalData: MetaverseGlobalData | null;
  topPicksLands: TopPickLand[] | null;
  topSellingsLands: TopSellingLand | null;
}

export default function HeatmapUI({ globalData, topPicksLands, topSellingsLands }: HeatmapUIProps) {
  const { theme } = useTheme();

  const heatmapDivRef = useRef<HTMLDivElement>(null);
  // const isFullScreen = document.fullscreenElement;
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const metaverseSelected = useAppSelector(state => state.heatmap.metaverseSelected);
  const prices = useAppSelector(state => state.coinGecko.coins);

  const dispatch = useAppDispatch();
  // const [filterBy, setFilterBy] = useState<MapFilter>("basic");
  const [selectMetaverse, setSelectMetaverse] = useState<boolean>(false);
  // const [selectFilter, setSelectFilter] = useState<boolean>(false);
  const [selectCoord, setSelectCoord] = useState<boolean>(false);
  const [landId, setLandId] = useState<number | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<{ X: number | undefined; Y: number | undefined }>({ X: undefined, Y: undefined });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [openSpecificModal, setOpenSpecificModal] = useState<boolean>(false);
  const [legendFilter, setLegendFilter] = useState<LegendFilter | undefined>();
  const [cardData, setCardData] = useState<SingleLandAPIResponse | undefined>();
  const [predictions, setPredictions] = useState<IPredictions>();

  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setHeatmapMetaverse(metaverse));
  }

  // const [dims, setDims] = useState({
  // 	height: heatmapDivRef.current?.offsetWidth,
  // 	width: heatmapDivRef.current?.offsetWidth,
  // });

  // Function for resizing heatmap
  // const resize = () => {
  // 	if (!heatmapDivRef.current) return;
  // 	setDims({
  // 		height: heatmapDivRef.current.offsetHeight,
  // 		width: heatmapDivRef.current.offsetWidth,
  // 	});
  // };


  function onClickLand(land: LandTileData) {
    if (!metaverseSelected) return LogError(Module.Heatmap, "No metaverse selected");
    setIsVisible(true);
    const params = {
      from: 0,
      size: 1,
      tokenId: land.tokenId,
      x: land.landX,
      y: land.landY
    };
    GetMapLandValuation(metaverseSelected, params)
      .then((result) => {
        if (result.success) {
          const landValuation = Object.values(result.value)[0];
          setCardData(landValuation);
          const predictions = convertETHPrediction(prices, landValuation.eth_predicted_price, metaverseSelected);
          setPredictions(predictions);
        } else {
          console.error('Error', result.errMessage);
        }
      })
      .catch((error) => {
        LogError(Module.Heatmap, "Unexpected error", error);
      });
  }

  const toggleFullScreen = () => {
    if (heatmapDivRef.current) {
      if (!isFullScreen) {
        heatmapDivRef.current.requestFullscreen().catch((error) => {
          console.error("Error entering full screen mode:", error);
        });
      } else {
        document.exitFullscreen().catch((error) => {
          console.error("Error when exiting full screen mode:", error);
        });
      }
      // Actualiza el estado de pantalla completa
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleClose = () => {
    setOpenSpecificModal(false);
    setIsVisible(false);
  }

  // useEffect(()=>{
  //   resize();
  // 	window.addEventListener("resize", resize);

  // 	return () => window.removeEventListener("resize", resize);
  // },[metaverseSelected])
  
  return (
    <div className={`mb-24 mt-10 rounded-2xl ${metaverseSelected == undefined ? 'bg-lm-fill dark:bg-nm-dm-fill' : ''}`}>
      {
        metaverseSelected === undefined ?
          <div >
            <h2 className='text-lm-text dark:text-nm-highlight font-bold text-2xl lg:text-3xl text-center py-8'>
              Choose a Metaverse
            </h2>

            <div className='flex flex-wrap gap-x-2 items-center justify-center bg-nm-gray dark:bg-[#232323] rounded-[32px] w-fit m-auto py-2 px-10 lg:px-24'>
              <BsExclamationCircleFill className={`text-2xl text-[#6196FF]`} />
              <p className='flex text-base font-semibold  text-lm-text dark:text-nm-highlight text-center md:text-start'>You can have 5 free valuations, after that pro version is needed</p>
            </div>

            <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} form={ButtonForm.Vertical} isBorder={false} />
            <div className="flex justify-center items-center pb-6">
              <Image src={`${theme !== 'dark' ? "/images/icons/magic-store.png" : "/images/icons/dm-magic-store.png"}`} width={196} height={44} alt="magic store" />
            </div>
          </div>
          :
          <div>
            {metaverseSelected &&
              <>
                <EstimatorValuesUI metaverseSelected={metaverseSelected} info={`THE HUB LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of ${metaverseSelected} Map and get insights about current price trends. The valuations are updated at a daily basis.`} globalData={globalData} />
                <div className="rounded-3xl p-7 shadow-relief-12 dark:shadow-dm-relief-12 h-[80vh] hidden lg:flex">
                  {/* <button className="w-6 h-6 bg-red-600 rounded-2xl top-1/2 left-1/2 relative cursor-pointer z-20" onClick={() => setIsVisible(true)}></button> */}
                  <div ref={heatmapDivRef} className="w-full h-full relative">
                    <div className="absolute top-1 left-1 z-20 flex gap-4 md:w-fit w-full m-4">
                      {/* Metaverse Selection */}
                      <MapChooseMetaverseUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} selectMetaverse={selectMetaverse} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} 
                      // setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} 
                      setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} />
                      {/* Filter Selection */}
                      {/* <MapChooseFilterUI filterBy={filterBy} setFilterBy={(mapFilter: MapFilter) => setFilterBy(mapFilter)} selectFilter={selectFilter} setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} /> */}
                      {/* Search by coords */}
                      <MapSearchUI selectCoord={selectCoord} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)}
                      // setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} 
                      setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setCoordinates={(newCoordinates) => setCoordinates(newCoordinates)} coordinates={coordinates} landId={landId} setLandId={setLandId} />
                    </div>
                    {
                      !isVisible &&
                      <div className="absolute z-20 top-1 right-1 rounded-full bg-nm-fill dark:bg-nm-dm-fill m-4 p-2 h-9 w-9">
                        <button onClick={toggleFullScreen}>
                          {isFullScreen ? (
                            <BiExitFullscreen className="text-xl cursor-pointer hover:scale-120" />
                          ) : (
                            <BiFullscreen className="text-xl cursor-pointer hover:scale-120" />
                          )}
                        </button>
                      </div>
                    }
                    <Heatmap2D viewportWidth={heatmapDivRef.current?.offsetWidth ?? window.innerWidth} viewportHeight={heatmapDivRef.current?.offsetHeight ?? window.innerHeight}
                      metaverse={metaverseSelected} renderAfter={false} onClickLand={onClickLand} initialX={0} initialY={0} />
                    {
                      // filterBy === "basic" && 
                      !isVisible &&
                      <MapLegendUI legendFilter={legendFilter} setLegendFilter={(legend: LegendFilter | undefined) => setLegendFilter(legend)} metaverse={metaverseSelected} />
                    }
                    {isVisible && !openSpecificModal &&
                      <div className="absolute bottom-16 right-1 flex flex-col gap-4 m-4">
                        {
                          cardData &&
                          <MapCardUI landData={cardData} metaverse={metaverseSelected} setIsVisible={(isVisble: boolean) => setIsVisible(isVisble)} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} predictions={predictions} />
                        }
                      </div>
                    }
                    {openSpecificModal && cardData && 
                      <SpecificLandModalUI onClose={() => handleClose()} land={cardData} metaverse={metaverseSelected} cardForm={InformationCardForm.MapCard} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} predictions={predictions}/>
                    }
                  </div>
                </div>
                <h1 className="text-xl font-bold dark:text-nm-highlight block lg:hidden text-center">To use heatmap go to desktop version</h1>
                {/* <div>
                  <div className="flex items-center justify-center mt-7 text-lm-text dark:text-nm-highlight">
                    <div className="flex flex-col justify-center text-center">
                      <p className="font-bold lg:text-3xl text-2xl text-center">{METAVERSE_LABEL[metaverseSelected]} Hot Deals</p>
                      <p className="font-medium text-center">Underpriced listings  on offer</p>
                    </div>
                  </div>
                  <div className="mt-7">
                    <HotDealsUI metaverseSelected={metaverseSelected} />
                  </div>
                </div> */}
                {/* <div className="mt-10 flex flex-wrap justify-center w-full items-end">
                  <div className="flex flex-wrap justify-center gap-x-4">
                    <BoxInformationUI title={"Daily Volume:"} predictions={predictions} metaverse={metaverseSelected} />
                    <BoxInformationUI title={"Floor Price:"} predictions={predictions} metaverse={metaverseSelected} />
                    <BoxInformationUI title={"Estimate Accuracy:"} predictions={predictions} metaverse={metaverseSelected} />
                  </div>
                  <div className="w-[580px] h-[205px] bg-lm-fill dark:bg-nm-dm-fill rounded-3xl flex flex-col items-center justify-center my-2 2xl:ml-4">
                    <h1>Graph</h1>
                    <p>coming soon</p>
                  </div>
                </div> */}
                <TopLandsUI tableData={topPicksLands} title="Our Top Picks" headers={headersPicks} />
                <TopSellsLandsUI tableData={topSellingsLands} title="Our Top Sells" headers={headersSells} />
              </>
            }
          </div>
      }
    </div>
  )
}