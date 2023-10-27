import { SingleLandAPIResponse } from "../interfaces/land.interface";

export type LandsKey = 'sandbox' | 'decentraland' | 'axie-infinity' | 'somnium-space';

export type LandListAPIResponse = Record<string, SingleLandAPIResponse>