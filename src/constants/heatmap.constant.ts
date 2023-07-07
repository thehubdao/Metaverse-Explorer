/**
 * Percent Filter triggers when a user clicks on a colored squared.
 * Once clicked, only the lands on that percentage/number range will display
 */
export const PERCENT_FILTER = {
    p20: 20,
    p40: 40,
    p60: 60,
    p80: 80,
    p100: 100,
} as const;

export const LEGEND_FILTER = {
    Portfolio: 'portfolio',
    Watchlist: 'watchlist',
    OnSale: 'on-sale',
    PremiumLands: 'premium-lands',
} as const;

export const LOAD_PHRASES_ARRAY = [
    'Did you know that there are over 160 siloed virtual worlds in the metaverse?',
    'The size of a single parcel in Decentraland is 16x16 meters!',
    'There are over 160,000 Sandbox LANDs',
    'Somnium Space is the leading VR compatible metaverse currently available.',
    'The term "metaverse" was first introduced in 1992 by sci-fi author Neal Stephenson in his novel Snow Crash.',
    'A single parcel in the Sandbox metaverse measures a generous 96x96 meters.'
] as const;

export const LOAD_PHRASES_LENGHT = LOAD_PHRASES_ARRAY.length;
export const CHUNK_SIZE = 32
export const TILE_SIZE = 64
export const BOUND_SIZE = 0
export const BLOCK_SIZE = CHUNK_SIZE * TILE_SIZE;