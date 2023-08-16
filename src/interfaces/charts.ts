import { AnalyticsChartRoutes } from "../enums/charts"
import { Metaverses } from "../enums/common"

export interface ChartInfo {
  route: string,
  label: string,
  description: string
}

export interface ApiData {
  time: number,
  data: number
}

export interface AnalyticChartData extends ChartInfo {
  chartEnum: AnalyticsChartRoutes,
  data: { [key in Metaverses]: ApiData[] },
  status: 'error' | ' loading' | 'ready'
}