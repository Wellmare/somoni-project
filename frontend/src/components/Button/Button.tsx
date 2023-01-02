import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import s from './Button.module.css';

import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../types/ITheme';

const Button: FC = () => {
    // const themeContext = useContext(ThemeContext);
    // const lightClasses =
    //     'p-5 text-black text-opacity-80 bg-blue-500 hover:bg-blue-400 hover:text-opacity-70 active:bg-blue-300 active:text-opacity-60';
    // const darkClasses =
    //     'p-5 text-black text-opacity-80 bg-blue-500 hover:bg-opacity hover:text-opacity-70 active:bg-blue-300 active:text-opacity-60';

    return <button className={classNames(s.button)}>текст</button>;
};

export default Button;
