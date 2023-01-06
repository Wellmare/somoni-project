import { createContext } from 'react';

import { IThemeContext } from '../types/Theme';

export const ThemeContext = createContext<IThemeContext | null>(null);
