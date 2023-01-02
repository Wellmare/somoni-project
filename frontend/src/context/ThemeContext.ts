import { createContext } from 'react';

import { IThemeContext } from '../types/ITheme';

export const ThemeContext = createContext<IThemeContext | null>(null);
