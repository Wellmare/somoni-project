import { localStorageKeys } from './types/localStorageKeys';

export const getDataFromLocalStorage = <T>(key: localStorageKeys): T | null => {
    const value = localStorage.getItem(key);
    if (value != null) return JSON.parse(value) as T;
    return null;
};

export const setDataToLocalStorage = <T>(key: localStorageKeys, value: T): void => {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
};

export const removeDataFromLocalStorage = (key: localStorageKeys): void => {
    localStorage.removeItem(key);
};
