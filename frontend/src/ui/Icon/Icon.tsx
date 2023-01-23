import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './Icon.module.scss';

import { IconType } from '../../types/UI/IconType';

interface IIconProps {
    children: ReactNode;
    type: IconType;
    onClick?: () => void;
}

const Icon: FC<IIconProps> = ({ children, onClick, type }) => {
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
        <div className={classNames(s.button, typeClassName)} onClick={onClick}>
            {children}
        </div>
    );
};

export default Icon;
