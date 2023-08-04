export interface TokenData {
    expiry: number | undefined,
    token: string | undefined
}

export interface WatchlistResponse {
    "decentraland": object,
    "sandbox": object,
    "axie-infinity": object,
    "somnium-space": object
}