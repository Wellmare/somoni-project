import React, { FC, ReactNode } from 'react';

import s from './Badge.module.scss';

import { BadgeColor } from '../../types/UI/Badge.types';

interface IBadgeProps {
    color: BadgeColor;
    children: ReactNode;
}

const Badge: FC<IBadgeProps> = ({ color, children }) => {
    let colorClass = '';
    switch (color) {
        case BadgeColor.red:
            colorClass = s.red;
            break;
    }
    return <div className={`${s.badge} ${colorClass}`}>{children}</div>;
};

export default Badge;
