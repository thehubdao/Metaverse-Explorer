import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import InformationCardUI from "./informationCard.ui";


interface LandCardListUIProps {
  lands: LandProps[];
  prices: ICoinPrices;
}

export default function LandCardListUI({ lands, prices }: LandCardListUIProps) {
  return (<>
    {lands.map((land: LandProps) => {
      return (
        <div key={land.tokenId}>
          <div className="w-[520px] h-[300px] bg-nm-fill rounded-xl shadow-relief-16 hover:shadow-relief-12 my-3 flex">
            <div className="w-1/2">
              <ExternalAssetLinkUI land={land} isOpen={false} />
            </div>
            <div className="w-1/2">
              <InformationCardUI land={land} prices={prices} />
            </div>
          </div>
        </div>
      );
    })}
  </>
  );
}
