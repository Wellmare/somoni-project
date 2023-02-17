import React, { FC, ReactNode } from 'react';

import s from './Card.module.scss';

interface ICardProps {
    className?: string;
    children: ReactNode;
}

const Card: FC<ICardProps> = ({ className = '', children }) => {
    return <div className={`${s.card} ${className}`}>{children}</div>;
};

export default Card;
