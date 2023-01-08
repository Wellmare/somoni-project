import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './Button.module.scss';

import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';

interface ButtonProps {
    color: ButtonColors;
    size: ButtonSizes;
    width?: string;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ size, color, width, children }) => {
    let sizeClass: string;
    switch (size) {
        case ButtonSizes.sm:
            sizeClass = s.sm;
            break;
        case ButtonSizes.md:
            sizeClass = s.md;
            break;
        case ButtonSizes.lg:
            sizeClass = s.lg;
            break;
    }

    let colorClass: string;
    switch (color) {
        case ButtonColors.green:
            colorClass = s.green;
            break;
        case ButtonColors.blue:
            colorClass = s.blue;
            break;
    }

    return (
        <button className={classNames(s.button, sizeClass, colorClass)} style={{ width }}>
            {children}
        </button>
    );
};

export default Button;
