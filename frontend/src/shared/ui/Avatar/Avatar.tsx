import classNames from 'classnames';

import React, { FC, ReactNode } from 'react';

import { AvatarSize } from './index';

import s from './Avatar.module.scss';

interface IAvatarProps {
    children: ReactNode;
    size: AvatarSize;
}

export const Avatar: FC<IAvatarProps> = ({ children, size }) => {
    let sizeClass = '';
    switch (size) {
        case AvatarSize.small:
            sizeClass = s.small;
            break;
        case AvatarSize.medium:
            sizeClass = s.medium;
            break;
        case AvatarSize.large:
            sizeClass = s.large;
            break;
    }

    return <div className={classNames(sizeClass)}>{children}</div>;
};
