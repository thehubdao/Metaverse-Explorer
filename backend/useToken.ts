import axios, { AxiosRequestConfig } from "axios";
import { configure } from 'axios-hooks';
import { useCallback, useEffect, useRef } from "react";
import { setAccountToken } from "../state/account";
import { useAppDispatch } from "../state/hooks";
import { useTokenExpiration } from "./useTokenExpiration";

const REQ_URL = `${process.env.AUTH_SERVICE}/authService/`

export const axiosBase = axios.create({
    baseURL: REQ_URL,
});



export function useToken(onTokenInvalid: Function, onRefreshRequired: Function, logout: Function) {
    const dispatch = useAppDispatch()
    const accessToken = useRef<string>();
    const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(onRefreshRequired);

    const setToken = useCallback(
        ({ expiry, token }: any) => {
            accessToken.current = token;
            const expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + expiry / 1000)
            dispatch(setAccountToken(token))
            setTokenExpiration(expirationDate);
        },
        [setTokenExpiration],
    );

    const isAuthenticated = useCallback(() => {
        return !!accessToken.current;
    }, []);

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
            (config: AxiosRequestConfig): AxiosRequestConfig => {
                if (!config.headers) return config
                config.headers.authorization = `${accessToken.current}`;
                return config;
            },
        );

        // if the current token is expired or invalid, logout the user
        axiosBase.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401 && accessToken.current) {
                    clearToken();

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
        setToken,
        isAuthenticated,
    };
}