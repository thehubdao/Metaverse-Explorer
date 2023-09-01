
import { MetaverseOptionsKey } from "../../enums/metaverses.enum";
import { LandListAPIResponse } from "../../lib/valuation/valuationTypes";
import { ICoinPrices } from "../../types/valuationTypes";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import InformationCardUI from "./informationCard.ui";


interface LandCardListUIProps {
  lands: [MetaverseOptionsKey, LandListAPIResponse][];
  prices: ICoinPrices;
}

export default function LandCardListUI({ lands, prices }: LandCardListUIProps) {

  return (
    <>
      {
        lands.map(([metavese, landsMetaverse]) => {
          return Object.values(landsMetaverse).map((land) => {
            return (
              <div key={land.tokenId}>
                <div className="w-[520px] h-[300px] bg-nm-fill rounded-xl shadow-relief-16 hover:shadow-relief-12 my-3 flex">
                  <div className="w-1/2">
                    <ExternalAssetLinkUI land={land} isOpen={false} metaverse={metavese} />
                  </div>
                  <div className="w-1/2">
                    <InformationCardUI land={land} prices={prices} metaverse={metavese} />
                  </div>
                </div>
              </div>
            );
          });
        })
      }
    </>
  );
}
