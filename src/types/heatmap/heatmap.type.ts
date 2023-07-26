import {MapFilterEnum} from "../../enums/heatmap.enum";
import {LEGEND_FILTER, PERCENT_FILTER} from "../../constants/heatmap/heatmap.constant";

export type MapFilter = keyof typeof MapFilterEnum;

export type PercentFilterKeys = keyof typeof PERCENT_FILTER;
export type PercentFilter = typeof PERCENT_FILTER[PercentFilterKeys] | undefined;

/**
 * Legend Filter triggers when a user clicks on a colored squared on the Legend (bottom Right).
 * Once clicked, only the lands inside that legend (portfolio,watchlist, ...etc) will display
 */
export type LegendFilterKeys = keyof typeof LEGEND_FILTER;
export type LegendFilter = typeof LEGEND_FILTER[LegendFilterKeys] | undefined;

export type LogoColors = 'black' | 'blue';