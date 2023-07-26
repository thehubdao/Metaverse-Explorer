import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenData } from "../interfaces/common.interface";

interface LoginState {
    connected: boolean
    address: string | undefined
    accessToken: TokenData | undefined
}

const initialState: LoginState = {
    connected: false,
    address: undefined,
    accessToken: undefined
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload
        },
        disconnect: () => initialState,
        setAddress: (state, { payload }: PayloadAction<`0x${string}` | undefined>) => {
            state.address = payload
        },
        setAccountToken: (state, { payload }: PayloadAction<TokenData | undefined>) => {
            state.accessToken = payload
        },
    },
})

export const { connect, disconnect, setAddress, setAccountToken } = loginSlice.actions

export default loginSlice.reducer