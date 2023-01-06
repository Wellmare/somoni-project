export interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}
