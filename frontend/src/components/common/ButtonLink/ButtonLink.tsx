import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import s from './ButtonLink.module.scss';

import { ButtonColors } from '../../../types/UI/Button.types';

interface IButtonLinkProps {
    color: ButtonColors;
    linkTo: string;
    children: ReactNode;
    [x: string]: any;
}

const ButtonLink: FC<IButtonLinkProps> = ({ color, linkTo, children, ...props }) => {
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
        <Link to={linkTo} className={classNames(s.link, colorClass)} {...props}>
            {children}
        </Link>
    );
};

export default ButtonLink;
