import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

interface IPostButtonProps {
    children: ReactNode;
    count: number;
    onClick?: () => void;
}

const PostButton: FC<IPostButtonProps> = ({ children, onClick, count }) => {
    return (
        <div className={classNames('flex', 'justify-between', 'items-center')} onClick={onClick}>
            {children} <div className={'ml-3'}>{count}</div>
        </div>
    );
};

export default PostButton;
