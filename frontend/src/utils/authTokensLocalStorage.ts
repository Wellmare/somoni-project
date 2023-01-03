import { getDataFromLocalStorage, removeDataFromLocalStorage, setDataToLocalStorage } from './localStorage';

import { localStorageKeys } from '../types/localStorageKeys';
import { ITokens } from '../types/login.types';

export const getAuthTokensFromLocalStorage = (): ITokens | null => {
    const accessToken = getDataFromLocalStorage<string>(localStorageKeys.ACCESS_TOKEN);
    const refreshToken = getDataFromLocalStorage<string>(localStorageKeys.REFRESH_TOKEN);

    if (accessToken === null || refreshToken === null) return null;
    return {
        access: accessToken,
        refresh: refreshToken,
    };
};

export const setAuthTokensToLocalStorage = (tokens: ITokens): void => {
    setDataToLocalStorage<string>(localStorageKeys.ACCESS_TOKEN, tokens.access);
    setDataToLocalStorage<string>(localStorageKeys.REFRESH_TOKEN, tokens.refresh);
};

export const removeAuthTokensFromLocalStorage = (): void => {
    removeDataFromLocalStorage(localStorageKeys.ACCESS_TOKEN);
    removeDataFromLocalStorage(localStorageKeys.REFRESH_TOKEN);
};
