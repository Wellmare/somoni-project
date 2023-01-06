import React, { FC, useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../types/Theme';

const ThemeSwitcher: FC = () => {
    const themeContext = useContext(ThemeContext);

    const switchTheme = (): void => {
        if (themeContext?.theme === Theme.LIGHT) themeContext?.setTheme(Theme.DARK);
        if (themeContext?.theme === Theme.DARK) themeContext?.setTheme(Theme.LIGHT);
    };

    return (
        <div>
            <button onClick={switchTheme}>Change theme</button>
        </div>
    );
};

export default ThemeSwitcher;
