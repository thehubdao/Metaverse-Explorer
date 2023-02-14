import dynamic from 'next/dynamic'

export { default as AnalyticsMvChoice } from './AnalyticsMvChoice'
export { default as ChartLoader } from './ChartLoader'
export { chartRoutes, chartSymbolOptions } from './ChartOptions'

export const AnalyticsChart = dynamic(() => import('./AnalyticsChart'), {
  ssr: false,
})

export const FloorAndVolumeChart = dynamic(
  () => import('../../components/Valuation/FloorAndVolumeChart'),
  {
    ssr: false,
  }
)
