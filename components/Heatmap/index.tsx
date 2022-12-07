import dynamic from 'next/dynamic'

export { default as MapCard } from './MapCard'
export { default as MapInitMvChoice } from './MapInitMvChoice'
export { default as MapSearch } from './MapSearch'
export { default as MapChooseFilter } from './MapChooseFilter'
export { default as MapChooseMetaverse } from './MapChooseMetaverse'
export { default as MapLandSummary } from './MapLandSummary'
export { default as MapMobileFilters } from './MapMobileFilters'
export { default as HeatmapLoader } from './HeatmapLoader'
export { default as ColorGuide } from './ColorGuide'
export { default as MapLegend } from './MapLegend'

export const MaptalksCanva = dynamic(() => { return import('./MaptalksCanva')}, {ssr: false})
export const Heatmap2D = dynamic(() => { return import('./Heatmap2D')}, {ssr: false})