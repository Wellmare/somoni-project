import { createContext } from 'react';

import { IThemeContext } from '../types/IThemeContext';

export const ThemeContext = createContext<IThemeContext | null>(null);
