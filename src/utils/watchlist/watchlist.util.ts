import axios from "axios";
import { Module } from "../../enums/logging.enum";
import { Metaverses } from "../../enums/metaverses.enum"
import { SingleLandAPIResponse } from "../../interfaces/land.interface"
import { Result } from "../../types/common.type";
import { LogError } from "../logging.util";

// Add Land to User's WatchList
export async function addLandToWatchList(land: SingleLandAPIResponse, address: string, metaverse: Metaverses, token: string): Promise<Result<string>> {
  try {
    const addToWatchListRequest = await axios.post<string>(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/watchlistService/addToWatchlist?address=${address}&metaverse=${metaverse}`, land, {
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `${token}`
      }
    }
    );
    return { success: true, value: addToWatchListRequest.data };
  } catch (err) {
    const msg = "Error while adding Land to Watchlist!";
    LogError(Module.Heatmap, msg, err);
    return { success: false, errMessage: msg };
  }
}

// Remove Land from User's WatchList
export async function removeLandFromWatchList(land: SingleLandAPIResponse, address: string, metaverse: Metaverses, token: string): Promise<Result<string>> {
  try {
    const removeFromWatchListRequest = await axios.post<string>(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/watchlistService/removeFromWatchList?address=${address}&metaverse=${metaverse}`, land, {
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `${token}`
      }
    })
    return { success: true, value: removeFromWatchListRequest.data };
  } catch (err) {
    const msg = "Error while removing Land to Watchlist!";
    LogError(Module.Heatmap, msg, err);
    return { success: false, errMessage: msg };
  }
}