import { PriceListForm } from "../../enums/common.enum";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";
import PriceListUI from "../common/priceList.ui";

interface BoxInformationUIProps{
  title: string;
  prices: CoinValuesType;
}

export default function BoxInformationUI({title, prices}:BoxInformationUIProps) {
  return (
    <div>
      <p className="font-semibold text-lg ml-4">{title}</p>
      <div className="bg-lm-fill dark:bg-nm-dm-fill rounded-3xl w-[315px] h-[205px] flex">
        <PriceListUI prices={prices} form={PriceListForm.Light}/>
      </div>
    </div>
  )
}