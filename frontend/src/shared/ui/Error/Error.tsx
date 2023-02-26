import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import s from 'shared/ui/Error/Error.module.scss';

interface IErrorProps {
    children: ReactNode;
    className?: string;
}

export const Error: FC<IErrorProps> = ({ children, className }) => {
    return <div className={classNames(s.error, className)}>{children}</div>;
};
