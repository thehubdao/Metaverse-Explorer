import {METAVERSE_OBJECT} from "../constants/metaverse.constant";

export type MetaverseKeys = keyof typeof METAVERSE_OBJECT;
export type Metaverse = typeof METAVERSE_OBJECT[MetaverseKeys];