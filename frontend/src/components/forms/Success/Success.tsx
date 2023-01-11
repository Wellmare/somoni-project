import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

interface ISuccessProps {
    children: ReactNode;
}

const Success: FC<ISuccessProps> = ({ children }) => {
    return <div className={classNames('text-green-600')}>{children}</div>;
};

export default Success;
