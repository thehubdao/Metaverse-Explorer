import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm } from "../../enums/common.enum";
import EstimatorValuesUI from "./estimatorValues.ui";
import BoxInformationUI from "./boxInformation.ui";
import TopLandsUI from "./topLands.ui";
import { METAVERSE_LABEL, Metaverses } from "../../enums/metaverses.enum";
import HotDealsUI from "./hotDeals/hotDeals.ui";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setHeatmapMetaverse } from "../../state/heatmapSlice";
import { MetaverseGlobalData } from "../../interfaces/itrm/land-valuation.interface";
import { TopPickLand, TopSellingLand } from "../../interfaces/itrm/val-analytics.interface";
import TopSellsLandsUI from "./topSellsLands.ui";
import Heatmap2D from "../../components/heatmap/heatmap.component";
import { useRef, useState } from "react";
import { LandTileData } from "../../interfaces/heatmap.interface";
import MapChooseMetaverseUI from "./mapChooseMetaverse.ui";
import { MapFilter } from "../../types/heatmap/heatmap.type";
import MapChooseFilterUI from "./mapChooseFilter.ui";
import MapSearchUI from "./mapSearch.ui";


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
  const heatmapDivRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const coinPrices = useAppSelector(state => state.coinGecko.coins);
  const metaverseSelected = useAppSelector(state => state.heatmap.metaverseSelected);
  const dispatch = useAppDispatch();
  const [filterBy, setFilterBy] = useState<MapFilter>("basic");
  const [selectMetaverse, setSelectMetaverse] = useState<boolean>(false);
  const [selectFilter, setSelectFilter] = useState<boolean>(false);
  const [selectCoord, setSelectCoord] = useState<boolean>(false);
  const [landId, setLandId] = useState<number | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<{ X: number | undefined; Y: number | undefined }>({ X: undefined, Y: undefined });

  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setHeatmapMetaverse(metaverse));
  }

  function onClickLand(land: LandTileData) {
    console.warn(land);
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
                <div className="rounded-3xl p-7 shadow-relief-12 dark:shadow-dm-relief-12 h-[80vh]">
                  <div ref={heatmapDivRef} className="w-full h-full relative">
                    <div className="absolute top-1 left-1 z-20 flex gap-4 md:w-fit w-full m-4">
                      {/* Metaverse Selection */}
                      <MapChooseMetaverseUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} selectMetaverse={selectMetaverse} setSelectMetaverse={setSelectMetaverse} setSelectfilter={setSelectFilter} setSelectCoord={setSelectCoord} />
                      {/* Filter Selection */}
                      <MapChooseFilterUI filterBy={filterBy} setFilterBy={setFilterBy} selectfilter={selectFilter} setSelectfilter={setSelectFilter} setSelectMetaverse={setSelectMetaverse} setSelectCoord={setSelectCoord} />
                      {/* Search by coords */}
                      <MapSearchUI selectCoord={selectCoord} setSelectCoord={setSelectCoord} setSelectfilter={setSelectFilter} setSelectMetaverse={setSelectMetaverse} setCoordinates={setCoordinates} coordinates={coordinates} landId={landId} setLandId={setLandId} />
                    </div>
                    <Heatmap2D viewportWidth={heatmapDivRef.current?.offsetWidth ?? window.innerWidth} viewportHeight={heatmapDivRef.current?.offsetHeight ?? window.innerHeight}
                      metaverse={metaverseSelected} renderAfter={false} onClickLand={onClickLand} initialX={0} initialY={0} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center mt-7 text-lm-text dark:text-nm-highlight">
                    <div className="flex flex-col justify-center text-center">
                      <p className="font-bold lg:text-3xl text-2xl text-center">{METAVERSE_LABEL[metaverseSelected]} Hot Deals</p>
                      <p className="font-medium text-center">Underpriced listings  on offer</p>
                    </div>
                  </div>
                  <div className="mt-7">
                    <HotDealsUI metaverseSelected={metaverseSelected} />
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap justify-center w-full items-end">
                  <div className="flex flex-wrap justify-center gap-x-4">
                    <BoxInformationUI title={"Daily Volume:"} prices={coinPrices} />
                    <BoxInformationUI title={"Floor Price:"} prices={coinPrices} />
                    <BoxInformationUI title={"Estimate Accuracy:"} prices={coinPrices} />
                  </div>
                  <div className="w-[580px] h-[205px] bg-lm-fill dark:bg-nm-dm-fill rounded-3xl flex flex-col items-center justify-center my-2 2xl:ml-4">
                    <h1>Graph</h1>
                    <p>coming soon</p>
                  </div>
                </div>
                <TopLandsUI tableData={topPicksLands} title="Our Top Picks" headers={headersPicks} />
                <TopSellsLandsUI tableData={topSellingsLands} title="Our Top Sells" headers={headersSells} />
              </>
            }
          </div>
      }
    </div>
  )
}