import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";

import EstimatorValuesUI from "./estimatorValues.ui";
import TopLandsUI from "./topLands.ui";
import { Metaverses } from "../../enums/metaverses.enum";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setHeatmapMetaverse } from "../../state/heatmapSlice";
import { MetaverseGlobalData } from "../../interfaces/itrm/land-valuation.interface";
import { TopPickLand, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";
import TopSellsLandsUI from "./topSellsLands.ui";
import Heatmap2D from "../../components/heatmap/heatmap.component";
import { useRef, useState } from "react";
import { IPredictions, LandTileData, MapCoordinates } from "../../interfaces/heatmap.interface";
import MapChooseMetaverseUI from "./mapChooseMetaverse.ui";
import MapSearchUI from "./mapSearch.ui";
import { LegendFilter, MapFilterEnum } from "../../enums/heatmap/filter.enum";
import MapLegendUI from "./mapLegend.ui";
import MapCardUI from "./mapCard.ui";
import SpecificLandModalUI from "../common/specificLandModal.ui";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { GetMapLandValuation } from "../../utils/itrm/land-valuation.util";
import { LogError } from "../../utils/logging.util";
import { Module } from "../../enums/logging.enum";
import { convertETHPrediction } from "../../utils/common.util";
import { ButtonForm, InformationCardForm } from "../../enums/ui.enum";
import { SingleLandAPIResponse } from "../../interfaces/land.interface";
import { LandType } from "../../types/heatmap/land.type";

//TODO: component imports in development
// import BoxInformationUI from "./boxInformation.ui";
// import HotDealsUI from "./hotDeals/hotDeals.ui";

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
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const metaverseSelected = useAppSelector(state => state.heatmap.metaverseSelected);
  const prices = useAppSelector(state => state.coinGecko.coins);
  
  const dispatch = useAppDispatch();

  const [selectMetaverse, setSelectMetaverse] = useState<boolean>(false);
  const [selectCoord, setSelectCoord] = useState<boolean>(false);
  const [landId, setLandId] = useState<string | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<MapCoordinates>({ x: undefined, y: undefined });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [openSpecificModal, setOpenSpecificModal] = useState<boolean>(false);
  const [legendFilter, setLegendFilter] = useState<LegendFilter | undefined>();
  const [cardData, setCardData] = useState<SingleLandAPIResponse | undefined>();
  const [cardData2, setCardData2] = useState<LandType | undefined>();
  const [predictions, setPredictions] = useState<IPredictions>();
  const [error, setError] = useState<boolean>(false);
  
  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setHeatmapMetaverse(metaverse));
  }

  async function onClickLand(land?: LandTileData, coords?: MapCoordinates ) {
    setCardData2(land?.land);
    if (!metaverseSelected) return LogError(Module.Heatmap, "No metaverse selected");
    if (isVisible) setIsVisible(false);
    setIsVisible(true);
    const params = land
      ? {
        from: 0,
        size: 1,
        tokenId: metaverseSelected === Metaverses.SomniumSpace ? land.tokenId : undefined,
        x: land.landX,
        y: land.landY * -1
      }
      : {
        from: 0,
        size: 1,
        tokenId: landId,
        x: coords?.x ?? coordinates.x,
        y: coords?.y ?? coordinates.y
      };
    const result = await GetMapLandValuation(metaverseSelected, params);
      if (result.success) {
        const landValuation = Object.values(result.value)[0];
        if (metaverseSelected === Metaverses.SomniumSpace) {
          setCoordinates({ x: landValuation.center?.x, y: landValuation.center?.y });
        } else setCoordinates({ x: landValuation.coords.x, y: landValuation.coords.y }); 
        setCardData(landValuation);  
        const predictions = convertETHPrediction(prices, landValuation.eth_predicted_price, metaverseSelected);
        setPredictions(predictions);
      } else {
        LogError(Module.Heatmap, result.errMessage);
        setTimeout(() => handleError(), 1100);
      }
  }

  const toggleFullScreen = () => {
    if (heatmapDivRef.current) {
      if (!isFullScreen) {
        heatmapDivRef.current.requestFullscreen().catch((error) => {
          LogError(Module.Heatmap, "Error entering full screen mode:", error);
        });
      } else {
        document.exitFullscreen().catch((error) => {
          LogError(Module.Heatmap, "Error when exiting full screen mode:", error);
        });
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleError = () =>{
    setError(true);
    setIsVisible(false);
  }

  const handleClose = () => {
    setOpenSpecificModal(false);
    setIsVisible(false);
  }
  
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
                  <div ref={heatmapDivRef} className="w-full h-full relative">
                    <div className="absolute top-1 left-1 z-20 flex gap-4 md:w-fit w-full m-4">
                      {/* Metaverse Selection */}
                      <MapChooseMetaverseUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} selectMetaverse={selectMetaverse} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)}  onClose={() => handleClose()}/>

                      {/* Search by coords */}
                      <MapSearchUI selectCoord={selectCoord} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} landId={landId} setLandId={(tokenId) => setLandId(tokenId)} onClickSearch={(land?: LandTileData, coords?: MapCoordinates) => onClickLand(land, coords)} />
                    </div>
                    {
                      !isVisible &&
                      <div className="absolute z-20 top-1 right-1 rounded-full bg-nm-fill dark:bg-nm-dm-fill m-4 p-2 h-9 w-9">
                        <button onClick={() => toggleFullScreen()}>
                          {isFullScreen ? (
                            <BiExitFullscreen className="text-xl cursor-pointer hover:scale-120" />
                          ) : (
                            <BiFullscreen className="text-xl cursor-pointer hover:scale-120" />
                          )}
                        </button>
                      </div>
                    }
                  <Heatmap2D metaverse={metaverseSelected} renderAfter={false} onClickLand={(land: LandTileData) => onClickLand(land)} initialX={0} initialY={0} x={coordinates.x} y={coordinates.y} filter={MapFilterEnum.basic}/>
                    {
                      !isVisible &&
                      <MapLegendUI legendFilter={legendFilter} setLegendFilter={(legend: LegendFilter | undefined) => setLegendFilter(legend)} metaverse={metaverseSelected} />
                    }
                    {
                      error && isVisible &&
                      <div className="z-30 absolute bottom-3 right-3">
                        <p className="text-lg font-semibold text-center text-lm-text bg-nm-fill rounded-3xl px-5">
                          No a Valid Land or not enough Data yet!
                        </p>
                      </div>
                    }
                    {isVisible && !openSpecificModal &&
                      <div className="absolute bottom-16 right-1 flex flex-col gap-4 m-4">
                        {
                          cardData &&
                          <MapCardUI landData={cardData} metaverse={metaverseSelected} setIsVisible={(isVisble: boolean) => setIsVisible(isVisble)} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} predictions={predictions} landData2={cardData2}/>
                        }
                      </div>
                    }
                    {openSpecificModal && cardData &&
                      <SpecificLandModalUI onClose={() => handleClose()} land={cardData} metaverse={metaverseSelected} cardForm={InformationCardForm.MapCard} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} predictions={predictions} />
                    }
                  </div>
                </div>
                <h1 className="text-xl font-bold dark:text-nm-highlight block lg:hidden text-center">To use heatmap go to desktop version</h1>

                {/* TODO: component in progress */}
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
                {/* <TopLandsUI tableData={topPicksLands} title="Our Top Picks" headers={headersPicks} />
                <TopSellsLandsUI tableData={topSellingsLands} title="Our Top Sells" headers={headersSells} /> */}
              </>
            }
          </div>
      }
    </div>
  )
}