import React, { FC, useContext } from 'react';

import s from './Test.module.css';

import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../types/ITheme';

const Test: FC = () => {
    const themeContext = useContext(ThemeContext);

    const switchTheme = (): void => {
        if (themeContext?.theme === Theme.LIGHT) themeContext?.setTheme(Theme.DARK);
        if (themeContext?.theme === Theme.DARK) themeContext?.setTheme(Theme.LIGHT);
    };

    return (
        <div>
            <button onClick={switchTheme}>Change theme</button>
            <h1 className={s.h1}>text</h1>
        </div>
    );
};

export default Test;
