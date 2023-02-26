import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './PostButton.module.scss';

interface IPostButtonProps {
    children: ReactNode;
    count: number;
    onClick?: () => void;
}

export const PostButton: FC<IPostButtonProps> = ({ children, onClick, count }) => {
    return (
        <div
            className={classNames('flex', 'justify-between', 'items-center', 'cursor-pointer', s.postButton)}
            onClick={onClick}
        >
            {children} <div className={'ml-2'}>{count}</div>
        </div>
    );
};
