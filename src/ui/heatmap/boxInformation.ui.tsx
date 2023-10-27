import { Metaverses } from "../../enums/metaverses.enum";
import { PriceListForm } from "../../enums/ui.enum";
import { IPredictions } from "../../interfaces/heatmap.interface";
import PriceListUI from "../common/priceList.ui";

interface BoxInformationUIProps{
  title: string;
  predictions: IPredictions | undefined;
  metaverse: Metaverses;
}

export default function BoxInformationUI({title, predictions, metaverse}:BoxInformationUIProps) {
  return (
    <div className="my-2">
      <p className="font-semibold text-lg ml-4">{title}</p>
      <div className="bg-lm-fill dark:bg-nm-dm-fill rounded-3xl w-[315px] h-[205px] flex">
        <PriceListUI predictions={predictions} form={PriceListForm.Light} metaverse={metaverse}/>
      </div>
    </div>
  )
}