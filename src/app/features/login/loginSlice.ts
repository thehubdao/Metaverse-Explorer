import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
    connected: boolean
    address: string | undefined
    accessToken: object
}

const initialState: LoginState = {
    connected: false,
    address: undefined,
    accessToken: {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        connect: (state, { payload }) => {
            state.connected = true
            state.address = payload.address
        },
        disconnect: (state) => initialState,
        setAddress: (state, { payload }) => {
            state.address = payload
        },
        setAccountToken: (state, { payload }) => {
            state.accessToken = payload
        },
    },
})

export const { connect, disconnect, setAddress, setAccountToken } = loginSlice.actions

export default loginSlice.reducer