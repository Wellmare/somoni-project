import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from './Error.module.scss';

interface IErrorProps {
    children: ReactNode;
}

const Error: FC<IErrorProps> = ({ children }) => {
    return <div className={classNames(s.error)}>{children}</div>;
};

export default Error;
