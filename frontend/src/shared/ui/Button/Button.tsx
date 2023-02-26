import classNames from 'classnames';

import React, { FC, ReactNode } from 'react';

import { ButtonColors, ButtonSizes } from './index';

import s from './Button.module.scss';

interface IButtonProps {
    color: ButtonColors;
    size?: ButtonSizes;
    children: ReactNode;
    className?: string;
    [x: string]: any;
}

export const Button: FC<IButtonProps> = ({ size, color, children, className, ...props }) => {
    let sizeClass = '';
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

    let colorClass = '';
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
        case ButtonColors.primary:
            colorClass = s.primary;
            break;
    }

    return (
        <button className={classNames(s.button, sizeClass, colorClass, className)} {...props}>
            {children}
        </button>
    );
};
