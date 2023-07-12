import { Metaverses } from "../../enums/enums";
import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import InformationCardUI from "./informationCard.ui";


interface PortfolioCardUIProps {
  lands: LandProps[],
  metaverse: Metaverses;
  prices: ICoinPrices
}

export default function PortfolioCardUI({ lands, metaverse, prices }: PortfolioCardUIProps) {

  let filteredLands = lands;

  if (metaverse !== Metaverses.ALL) {
    filteredLands = lands.filter((land) => land.metaverse === metaverse);
  }

  return (
    filteredLands.map((land: LandProps) => {
      return (
        <div key={land.tokenId}>
          <div className="w-[520px] h-[300px] bg-nm-fill rounded-3xl shadow-relief-16 hover:shadow-relief-12 my-3 flex">
            <div className="w-1/2">
              <ExternalAssetLinkUI land={land} isOpen={false}/>
            </div>
            <div className="w-1/2">
              <InformationCardUI land={land} prices={prices} />
            </div>
          </div>
        </div>
      );
    })
  );
}
