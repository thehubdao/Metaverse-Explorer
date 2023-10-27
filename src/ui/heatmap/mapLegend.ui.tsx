import { LEGEND_COLORS, METAVERSE_LEGENDS } from "../../constants/heatmap/heatmap.constant";
import { LegendFilter } from "../../enums/heatmap/filter.enum";
import { Metaverses } from "../../enums/metaverses.enum";

interface MapLegendUIProps {
  legendFilter: LegendFilter | undefined;
  setLegendFilter: (legend:LegendFilter | undefined) => void;
  metaverse: Metaverses;
}

//TODO: add props and filter functionality
export default function MapLegendUI({ metaverse}: MapLegendUIProps) {
  const legends = METAVERSE_LEGENDS[metaverse];
  
  return (
    <ul
      className="flex flex-col gap-2 bg-nm-fill dark:bg-nm-dm-fill rounded-xl p-2 w-fit absolute bottom-1 right-1 m-4">
      {legends.map((key, index) => (
        <li className='flex gap-6 items-center' key={index}>
          <button
            style={{ background: LEGEND_COLORS[key] }}
            className={'w-4 h-4 top-[2px]'}/>
          <p className='text-lm-text dark:text-nm-highlight text-sm md:text-base font-semibold'>
            {key}
          </p>
        </li>
      ))}
    </ul>
    )
}