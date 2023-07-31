import axios from "axios";
import { useCallback, useRef } from "react";
import { useTokenExpiration } from "./useTokenExpiration";
import { TokenData } from "../interfaces/common.interface";

const REQ_URL = `${process.env.AUTH_SERVICE ?? ""}/authService/`

export const axiosBase = axios.create({
    baseURL: REQ_URL,
});

export function useToken(
    onRefreshRequired: () => void,
) {
    const accessToken = useRef<string | undefined>();
    const { setTokenExpiration } = useTokenExpiration(onRefreshRequired);

    const setToken = useCallback(
        (tokenData: TokenData) => {
            accessToken.current = tokenData.token;
            if (tokenData.expiry != undefined) {
                const expirationDate = new Date();
                expirationDate.setSeconds(expirationDate.getSeconds() + tokenData.expiry / 1000)
                setTokenExpiration(expirationDate);
            }
        },
        [setTokenExpiration],
    );

    return {
        setToken
    };
}