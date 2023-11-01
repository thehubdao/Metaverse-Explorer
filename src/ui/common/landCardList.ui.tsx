import { Metaverses } from "../../enums/metaverses.enum";
import { LandListAPIResponse } from "../../types/valuation.type";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import InformationCardUI from "./informationCard.ui";
import { useAppSelector } from "../../state/hooks";
import { convertETHPrediction } from "../../utils/common.util";
import { LandCardListForm } from "../../enums/ui.enum";


interface LandCardListUIProps {
  lands: [Metaverses, LandListAPIResponse][];
  landCardForm: LandCardListForm;
}

export default function LandCardListUI({ lands, landCardForm }: LandCardListUIProps) {
  const prices = useAppSelector(state => state.coinGecko.coins);
    
  return (
    <>
      {
        lands.map(([metaverse, landsMetaverse]) => {
          return Object.values(landsMetaverse).map((land) => {
            return (
              <div key={land.tokenId}>
                <div className="w-auto md:w-[520px] md:h-[300px] bg-nm-fill dark:bg-nm-dm-fill rounded-xl shadow-relief-16 dark:shadow-dm-relief-32 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 h-[200px] md:h-auto">
                    <ExternalAssetLinkUI land={land} isOpen={false} metaverse={metaverse} />
                  </div>
                  <div className="w-full md:w-1/2 pb-3">
                    <InformationCardUI land={land} metaverse={metaverse} predictions={convertETHPrediction(prices, land.eth_predicted_price, metaverse)} landCardForm={landCardForm}/>
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
