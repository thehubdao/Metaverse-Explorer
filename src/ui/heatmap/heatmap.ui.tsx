import { BsExclamationCircleFill } from "react-icons/bs";
import Image from "next/image";
import LandsMenuUI from "../common/landsMenu.ui";
import { ButtonForm, InformationCardForm } from "../../enums/common.enum";
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
import { useEffect, useRef, useState } from "react";
import { LandTileData } from "../../interfaces/heatmap.interface";
import MapChooseMetaverseUI from "./mapChooseMetaverse.ui";
import { MapFilter } from "../../types/heatmap/heatmap.type";
import MapChooseFilterUI from "./mapChooseFilter.ui";
import MapSearchUI from "./mapSearch.ui";
import { LegendFilter } from "../../enums/heatmap/filter.enum";
import MapLegendUI from "./mapLegend.ui";
import MapCardUI from "./mapCard.ui";
import SpecificLandModalUI from "../common/specificLandModal.ui";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { SingleLandAPIResponse } from "../../types/valuationTypes";



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

  const coinPrices = useAppSelector(state => state.coinGecko.coins);
  const metaverseSelected = useAppSelector(state => state.heatmap.metaverseSelected);

  const dispatch = useAppDispatch();

  const [filterBy, setFilterBy] = useState<MapFilter>("basic");
  const [selectMetaverse, setSelectMetaverse] = useState<boolean>(false);
  const [selectFilter, setSelectFilter] = useState<boolean>(false);
  const [selectCoord, setSelectCoord] = useState<boolean>(false);
  const [landId, setLandId] = useState<number | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<{ X: number | undefined; Y: number | undefined }>({ X: undefined, Y: undefined });
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [openSpecificModal, setOpenSpecificModal] = useState<boolean>(false);
  const [legendFilter, setLegendFilter] = useState<LegendFilter | undefined>();

  const filterLands = (metaverse: Metaverses | undefined) => {
    dispatch(setHeatmapMetaverse(metaverse));
  }

  // const [dims, setDims] = useState({
	// 	height: heatmapDivRef.current?.offsetWidth,
	// 	width: heatmapDivRef.current?.offsetWidth,
	// });

  // // Function for resizing heatmap
	// const resize = () => {
	// 	if (!heatmapDivRef.current) return;
	// 	setDims({
	// 		height: heatmapDivRef.current.offsetHeight,
	// 		width: heatmapDivRef.current.offsetWidth,
	// 	});
	// };

  // const handleMapSection = async (x?: number, y?: number, tokenId?: string, lands?: SingleLandAPIResponse) => {
  //   try {
  //     let link = '';
  //     if (metaverseSelected === Metaverses.SandBox) {
  //       link = `${process.env.ITRM_SERVICE}/test/${metaverseSelected}/map?`;
  //     } else {
  //       link = `${process.env.ITRM_SERVICE}/mgh/v2/${metaverseSelected}/map?`;
  //     }

  //     const parameters = (x !== undefined && y !== undefined) ? `x=${x}&y=${y}` : tokenId ? `tokenId=${tokenId}` : null;
  //     const response = await fetch(`${link}${parameters}`, { method: "GET" });

  //     if (!response.ok) {
  //       console.error("Error in HTTP request:", response.status);
  //       return setTimeout(() => setIsVisible(true), 1100);
  //     }

  //     lands = await response.json();

  //     if (metaverseSelected !== Metaverses.SomniumSpace) {
  //       lands.coords.y = -lands.coords.y;
  //     }
  //   } catch (e) {
  //     console.error("An error occurred:", e);
  //     setTimeout(() => setIsVisible(true), 1100);
  //   }
  // };


  function onClickLand(land: LandTileData) {
    console.log(land, 'land');

  }

  const data = {
    "apiData": {
      "tokenId": "3062541302288446171170371466885913903138",
      "name": "Parcel 9,34",
      "images": {
        "image_url": "https://lh3.googleusercontent.com/qrlWtc6u8a4ahxhkvIB7tVQcs8ISPoSuoTu-lyXYXNt-Az7VZC7Tve9J1MezletKSma0-NSsd2LqnrsDiL3Cf48bbk5IRl4O4c5z6g",
        "image_preview_url": "https://lh3.googleusercontent.com/qrlWtc6u8a4ahxhkvIB7tVQcs8ISPoSuoTu-lyXYXNt-Az7VZC7Tve9J1MezletKSma0-NSsd2LqnrsDiL3Cf48bbk5IRl4O4c5z6g=s250",
        "image_thumbnail_url": "https://lh3.googleusercontent.com/qrlWtc6u8a4ahxhkvIB7tVQcs8ISPoSuoTu-lyXYXNt-Az7VZC7Tve9J1MezletKSma0-NSsd2LqnrsDiL3Cf48bbk5IRl4O4c5z6g=s128",
        "image_original_url": "https://api.decentraland.org/v1/parcels/9/34/map.png?size=24&width=1024&height=1024"
      },
      "external_link": "https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/3062541302288446171170371466885913903138",
      "market_links": {
        "opensea": "https://opensea.io/assets/ethereum/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/3062541302288446171170371466885913903138",
        "looksrare": "https://looksrare.org/collections/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/3062541302288446171170371466885913903138",
        "X2Y2": "https://x2y2.io/eth/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/3062541302288446171170371466885913903138"
      },
      "token_metadata": "https://api.decentraland.org/v2/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/3062541302288446171170371466885913903138",
      "predicted_price": 12079.86556076581,
      "eth_predicted_price": 2.170321630188178,
      "floor_adjusted_predicted_price": 2.170321630188178,
      "coords": {
        "x": 9,
        "y": -34
      },
      "history": [
        {
          "timestamp": 1674816767000,
          "time": "2023-01-27 10:52:47",
          "hash": "0x77711d03fdee4b247e47b7cc7d7afe42e42be3e0a612709ea68f92fc125a0d0f",
          "action": "Add Land to Estate",
          "owner": "0x959e104e1a4db6317fa58f8295f586e1a978c297",
          "chain": "ethereum",
          "valuation": 6.54370564613492,
          "estateId": "5415"
        }
      ],
      "variation_last_week": null,
      "variation_last_four_weeks": null,
      "variation_last_six_months": null,
      "tile": {
        "type": 10,
        "top": 1
      },
      "owner": "0x1e2fef88db7cb74691a21a39c9cb44bb4df52af5",
      "estateId": "5415",
      "current_price": 5833.333333333333,
      "current_price_eth": 1.035661347575525,
      "metaverse": "decentraland",
      "prices": {
        "eth_predicted_price": 2.170321630188178,
        "predicted_price": 0
      }
    },
    "predictions": {
      "ethPrediction": 2.170321630188178,
      "usdPrediction": 0,
      "metaversePrediction": null
    },
    "landCoords": {
      "x": 9,
      "y": 34
    },
    "name": "Parcel 9,34"
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
    setIsVisible(true);
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
                  <button className="w-6 h-6 bg-red-600 rounded-2xl top-1/2 left-1/2 relative cursor-pointer z-20" onClick={() => setIsVisible(false)}></button>
                  <div ref={heatmapDivRef} className="w-full h-full relative">
                    <div className="absolute top-1 left-1 z-20 flex gap-4 md:w-fit w-full m-4">
                      {/* Metaverse Selection */}
                      <MapChooseMetaverseUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses | undefined) => filterLands(metaverse)} selectMetaverse={selectMetaverse} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} />
                      {/* Filter Selection */}
                      <MapChooseFilterUI filterBy={filterBy} setFilterBy={(mapFilter: MapFilter) => setFilterBy(mapFilter)} selectFilter={selectFilter} setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} />
                      {/* Search by coords */}
                      <MapSearchUI selectCoord={selectCoord} setSelectCoord={(coordState: boolean) => setSelectCoord(coordState)} setSelectFilter={(filterState: boolean) => setSelectFilter(filterState)} setSelectMetaverse={(metaveseState: boolean) => setSelectMetaverse(metaveseState)} setCoordinates={(newCoordinates) => setCoordinates(newCoordinates)} coordinates={coordinates} landId={landId} setLandId={setLandId} />
                    </div>
                    {
                      isVisible &&
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
                      filterBy === "basic" && isVisible &&
                      <MapLegendUI legendFilter={legendFilter} setLegendFilter={(legend: LegendFilter | undefined) => setLegendFilter(legend)} metaverse={metaverseSelected} />
                    }
                    {!isVisible && !openSpecificModal &&
                      <div className="absolute bottom-16 right-1 flex flex-col gap-4 m-4">
                        <MapCardUI landData={data} metaverse={metaverseSelected} setIsVisible={(isVisble: boolean) => setIsVisible(isVisble)} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} />
                      </div>
                    }
                    {!isVisible && openSpecificModal &&
                      <SpecificLandModalUI onClose={() => handleClose()} land={data.apiData} metaverse={metaverseSelected} cardForm={InformationCardForm.MapCard} setOpenSpecificModal={(isOpenModal: boolean) => setOpenSpecificModal(isOpenModal)} />
                    }
                  </div>
                </div>
                <h1 className="text-xl font-bold dark:text-nm-highlight block lg:hidden text-center">To use heatmap go to desktop version</h1>
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
                    <BoxInformationUI title={"Daily Volume:"} prices={coinPrices} metaverse={metaverseSelected} />
                    <BoxInformationUI title={"Floor Price:"} prices={coinPrices} metaverse={metaverseSelected} />
                    <BoxInformationUI title={"Estimate Accuracy:"} prices={coinPrices} metaverse={metaverseSelected} />
                  </div>
                  {/* <div className="w-[580px] h-[205px] bg-lm-fill dark:bg-nm-dm-fill rounded-3xl flex flex-col items-center justify-center my-2 2xl:ml-4">
                    <h1>Graph</h1>
                    <p>coming soon</p>
                  </div> */}
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