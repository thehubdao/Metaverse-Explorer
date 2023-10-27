/**
 * Percent Filter triggers when a user clicks on a colored squared.
 * Once clicked, only the lands on that percentage/number range will display
 */
export const PERCENT_FILTER = [
    20,
    40,
    60,
    80,
    100
] as const;

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
export const CHUNK_SIZE = 32;
export const TILE_SIZE = 12;
export const BOUND_SIZE = 0;
export const BLOCK_SIZE = CHUNK_SIZE * TILE_SIZE;
export const SOMNIUM_SCALE = 108;
export const DECENTRALAND_LANDS = [5, 6, 7, 8, 12] as const;


export const LEGEND_COLORS = {
    OnSale: '#ffe5a3', // On sale
    PremiumLands: '#47e298',
    // Decentraland Only
    Roads: '#5775a5', // roads
    Plazas: '#32d2ff', // plazas
    Districts: '#23334d', // districts

    Watchlist: '#ff597b', // On User's Watchlist
    Portfolio: '#0000ff'//'#4Df0CF', // Owned by User (On their portfolio)
}

export const FILTER_COLOR = {
    DarkBlue: '#282896',
  Red: '#ff3838',
  Orange: '#ff8762',
  Yellow: '#ffdc62',
  Green: '#26ec75',
  MinBlue: '#92c4e9',
  Gray: '#b0b0b0',
}