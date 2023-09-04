export const enum ValuationState {
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
  LoadingQuery = "loadingQuery",
  LoadedQuery = "loadedQuery",
  ErrorQuery = "errorQuery",
}

export const enum LegendColor {
  OnSale = '#ffe5a3', // On sale
  PremiumLands = '#47e298',
  // Decentraland Only
  Roads = '#5775a5', // roads
  Plazas = '#32d2ff', // plazas
  Districts = '#23334d', // districts

  Watchlist = '#ff597b', // On User's Watchlist
  Portfolio = '#0000ff'//'#4Df0CF', // Owned by User (On their portfolio)
}

export const enum FilterColor {
  DarkBlue = '#282896',
  Red = '#ff3838',
  Orange = '#ff8762',
  Yellow = '#ffdc62',
  Green = '#26ec75',
  MinBlue = '#92c4e9',
  Gray = '#b0b0b0',
}

export enum DecentralandApiColor {
  Missing = -1,
  MyParcels = 0,
  MyParcelsOnSale = 1, 
  MyStates = 2, 
  MyStatesOnSale = 3, 
  AllowParcel = 4, 
  Districts = 5, 
  Contributions = 6, 
  Roads = 7, 
  Plazas = 8, 
  OwnParcel = 9, 
  SaleParcel = 10, 
  UnOwnParcel = 11, 
  Background = 12, 
  OddLoading = 13, 
  EvenLoading = 14, 
}