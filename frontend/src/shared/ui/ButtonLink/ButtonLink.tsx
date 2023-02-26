import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { ButtonColors } from 'shared/ui/Button';

import s from './ButtonLink.module.scss';

interface IButtonLinkProps {
    color: ButtonColors;
    linkTo?: string;
    children: ReactNode;
    [x: string]: any;
}

export const ButtonLink: FC<IButtonLinkProps> = ({ color, linkTo, children, ...props }) => {
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
        <>
            {linkTo !== undefined ? (
                <Link to={linkTo} className={classNames(s.link, colorClass)} {...props}>
                    {children}
                </Link>
            ) : (
                <a className={classNames(s.link, colorClass)} {...props}>
                    {children}
                </a>
            )}
        </>
    );
};
