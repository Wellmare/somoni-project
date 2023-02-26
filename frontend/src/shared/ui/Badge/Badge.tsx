import React, { FC, ReactNode } from 'react';

import { BadgeColor } from './index';

import s from './Badge.module.scss';

interface IBadgeProps {
    color: BadgeColor;
    children: ReactNode;
}

export const Badge: FC<IBadgeProps> = ({ color, children }) => {
    let colorClass = '';
    switch (color) {
        case BadgeColor.red:
            colorClass = s.red;
            break;
    }
    return <div className={`${s.badge} ${colorClass}`}>{children}</div>;
};
