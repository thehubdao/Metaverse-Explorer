import { Metaverses } from '../../enums/metaverses.enum';
import { LandListAPIResponse } from '../../types/valuation.type';
    
export const fetchLandList = async (metaverse: Metaverses, lands: string[]) => {
    let link = '';
    link = `${process.env.NEXT_PUBLIC_ITRM_SERVICE??""}/mgh/v2/${metaverse}/map?tokenId=`;
    lands.forEach((land, i) => { link = link + land + (i !== lands.length - 1 ? ',' : '') });
    const res = await fetch(link);
    return (await res.json()) as LandListAPIResponse;
}