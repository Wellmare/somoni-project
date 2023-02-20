import React, { FC, ReactNode } from 'react';

import s from './Card.module.scss';

interface ICardProps {
    className?: string;
    children: ReactNode;
    [props: string]: any;
}

const Card: FC<ICardProps> = ({ className = '', children, ...props }) => {
    return (
        <div className={`${s.card} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
