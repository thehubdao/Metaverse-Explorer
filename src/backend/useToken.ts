import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { configure } from 'axios-hooks';
import { useCallback, useEffect, useRef } from "react";
import { useTokenExpiration } from "./useTokenExpiration";
import {TokenData} from "../interfaces/itrm/auth.interface";

const REQ_URL = `${process.env.NEXT_PUBLIC_AUTH_SERVICE ?? ""}/authService/`;

export const axiosBase = axios.create({
    baseURL: REQ_URL,
});

export function useToken(
    onTokenInvalid: () => void,
    logout: () => void,
    onRefreshRequired?: () => void,
) {

    const accessToken = useRef<string | undefined>();
    const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(onRefreshRequired ?? (() => undefined));

    const setToken = useCallback(
        ({token, expiry}: TokenData) => {
            accessToken.current = token;
            const expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + (expiry ?? 0) / 1000);
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
            if (shouldClearCookie) {
                logout();
            }
            // clear refresh token
            accessToken.current = '';

            // clear auto refresh interval
            clearAutomaticTokenRefresh();
        },
        [clearAutomaticTokenRefresh, logout],
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
            (error: AxiosError) => {
                if (error.code === "401" && accessToken.current) {
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