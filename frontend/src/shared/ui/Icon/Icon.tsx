import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import { IconType } from './index';

import s from './Icon.module.scss';

interface IIconProps {
    children: ReactNode;
    type?: IconType;
    onClick?: () => void;
    customTypeClassName?: string;
}

export const Icon: FC<IIconProps> = ({ children, onClick, type, customTypeClassName }) => {
    let typeClassName = '';
    switch (type) {
        case IconType.primary:
            typeClassName = s.primary;
            break;
        case IconType.red:
            typeClassName = s.red;
            break;
    }
    return (
        <div
            className={classNames(s.button, customTypeClassName !== undefined ? customTypeClassName : typeClassName)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
