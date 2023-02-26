import { ThemeContext } from 'app/context/ThemeContext';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from 'shared/lib/localStorage/localStorage';
import { localStorageKeys } from 'shared/lib/localStorage/types';
import { Theme } from 'shared/types/Theme';

const getTheme = (): Theme => {
    const theme = getDataFromLocalStorage<Theme>(localStorageKeys.THEME);

    if (theme !== null) return theme;

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return Theme.DARK;
    }
    return Theme.LIGHT;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        setDataToLocalStorage<Theme>(localStorageKeys.THEME, theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
