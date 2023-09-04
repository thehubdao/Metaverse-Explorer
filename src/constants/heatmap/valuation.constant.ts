import {FilterPercentage} from "../../types/heatmap/valuation.type";
import {DecentralandApiColor} from "../../enums/valuation.enum";

/*
 * Sadly, some prices on the eth_predicted_price are super high, making all the other lands very low
 * priced in % compared to them. If we were to divide lands into colors by percentage,
 * the high lands would be on 100% and the rest of them would end up on the lower 30/20%.
 * If we used normal percentages, most lands would be blue the higher ones red, defeating the purpose of the map since there would barely be
 * any yellow/orange or green.
 * To balance this out and make the map have more contrast between the lower lands we write that
 * lands using RED color are the ones that spawn from 100% til 30% .ORANGE from 30% to 12% YELLOW from 12% til 8%. GREEN from 8% til 4%
 * and Light-Blue from 4% till 0% THIS MIGHT CHANGE IN THE FUTURE, so change the percentages if needed. For the other filters we just use normal percentage, but with any case were the high numbers
 * are way too high compared to the other ones it might make the map more worthy of using to switch the % like we are doing with
 * eth_predicted_price.
 */
export const FILTER_PERCENTAGES: FilterPercentage = {
  predictedPricePercentage: [0, 8, 16, 24, 100],
  normal: [0, 8, 16, 24, 100],
  colors: [
    '#0000ff',
    '#00ffff',
    '#00ff00',
    '#ffff00',
    '#ff0000',
  ],
} as const;

// Colors for Tiles in Decentraland Api Basic Map
export const DECENTRALAND_API_COLORS: Record<DecentralandApiColor, string> = {
  [DecentralandApiColor.Missing]: '#b00b55',
  [DecentralandApiColor.MyParcels]: '#ff9990', // my parcels
  [DecentralandApiColor.MyParcelsOnSale]: '#ff32ca', // my parcels on sale
  [DecentralandApiColor.MyStates]: '#ff9990', // my estates
  [DecentralandApiColor.MyStatesOnSale]: '#ff4053', // my estates on sale
  [DecentralandApiColor.AllowParcel]: '#ffbd33', // parcels/estates where I have permissions
  [DecentralandApiColor.Districts]: '#23334D', // districts
  [DecentralandApiColor.Contributions]: '#563db8', // contributions
  [DecentralandApiColor.Roads]: '#354D74', // roads
  [DecentralandApiColor.Plazas]: '#32D2FF', // plazas
  [DecentralandApiColor.OwnParcel]: '#3D3A46', // owned parcel/estate
  [DecentralandApiColor.SaleParcel]: '#3D3A46', // parcels on sale (we show them as owned parcels)
  [DecentralandApiColor.UnOwnParcel]: '#09080A', // unowned pacel/estate
  [DecentralandApiColor.Background]: '#18141a', // background
  [DecentralandApiColor.OddLoading]: '#110e13', // loading odd
  [DecentralandApiColor.EvenLoading]: '#0d0b0e', // loading even
} as const;