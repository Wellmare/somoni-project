import React, { FC, ReactNode, useEffect, useState } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../types/IThemeContext';
import { localStorageKeys } from '../types/localStorageKeys';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils/localStorage';

const getTheme = (): Theme => {
    const theme = getDataFromLocalStorage<Theme>(localStorageKeys.THEME);
    return theme !== null ? theme : Theme.LIGHT;
};

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        setDataToLocalStorage<Theme>(localStorageKeys.THEME, theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
