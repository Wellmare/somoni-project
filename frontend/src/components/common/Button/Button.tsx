import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './Button.module.scss';

import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';

interface IButtonProps {
    color: ButtonColors;
    size: ButtonSizes;
    children: ReactNode;
    className?: string;
    [x: string]: any;
}

const Button: FC<IButtonProps> = ({ size, color, children, className, ...props }) => {
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
        case ButtonColors.gray:
            colorClass = s.gray;
            break;
        case ButtonColors.red:
            colorClass = s.red;
            break;
    }

    return (
        <button className={classNames(s.button, sizeClass, colorClass, className)} {...props}>
            {children}
        </button>
    );
};

export default Button;
