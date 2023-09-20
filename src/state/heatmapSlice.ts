import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Metaverses } from "../enums/metaverses.enum";

interface metaverseState {
    metaverseSelected: Metaverses | undefined;
}

const initialState: metaverseState = {
    metaverseSelected: undefined
}

const heatmapSlice = createSlice({
    name: 'heatmap',
    initialState,
    reducers: {
        setHeatmapMetaverse(state, action:PayloadAction<Metaverses | undefined>) {
            state.metaverseSelected = action.payload;
        },
        cleanHeatmapMetaverse: (state) => state.metaverseSelected = undefined
    },
})

export const { setHeatmapMetaverse, cleanHeatmapMetaverse } = heatmapSlice.actions

export default heatmapSlice.reducer