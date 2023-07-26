import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { configure } from 'axios-hooks';
import { useCallback, useEffect, useRef } from "react";
import { useTokenExpiration } from "./useTokenExpiration";
import { TokenData } from "../interfaces/common.interface";

const REQ_URL = `${process.env.AUTH_SERVICE ?? ""}/authService/`

export const axiosBase = axios.create({
    baseURL: REQ_URL,
});

export function useToken(
    onTokenInvalid: () => void,
    onRefreshRequired: () => void,
    logout: () => Promise<void>
) {

    const accessToken = useRef<string | undefined>();
    const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(onRefreshRequired);


    /**
     * Esta funcion solo se crea nuevamente si setTokenExpiration cambia
     * 
     * Deberiamos recibir un string | undefined
     * eso, asignarlo al token de TokenData y al accessToken del LoginState
     */
    const setToken = useCallback(
        (tokenData: TokenData) => {
            accessToken.current = tokenData.token;
            const expirationDate = new Date();
            //+ tokenData.expiry
            expirationDate.setSeconds(expirationDate.getSeconds() / 1000)
            setTokenExpiration(expirationDate);
        },
        [setTokenExpiration],
    );

    /**
     * clearToken depende de clearAutomaticTokenRefresh, igual que setToken
     */
    const clearToken = useCallback(
        (shouldClearCookie = true) => {
            // if we came from a different tab, we should not clear the cookie again
            const clearRefreshTokenCookie = shouldClearCookie ? logout() : Promise.resolve();

            // clear refresh token
            return clearRefreshTokenCookie.finally(() => {
                // clear token
                accessToken.current = '';

                // clear auto refresh interval
                clearAutomaticTokenRefresh();
            });
        },
        [clearAutomaticTokenRefresh],
    );

    useEffect(() => {
        // add authorization token to each request
        axiosBase.interceptors.request.use(
            (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                if (!config.headers) return config
                config.headers.authorization = `${accessToken.current ?? ""}`;
                return config;
            },
        );

        // if the current token is expired or invalid, logout the user
        axiosBase.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.code === "401" && accessToken.current) {
                    await clearToken();
                    // let the app know that the current token was cleared
                    onTokenInvalid();
                }
                return Promise.reject(error);
            },
        );

        configure({ axios });
    }, [clearToken, onTokenInvalid]);

    return {
        clearToken,
        setToken
    };
}