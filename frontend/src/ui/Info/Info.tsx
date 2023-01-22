import React, { FC, ReactNode } from 'react';

interface IInfoProps {
    children: ReactNode;
}

const Info: FC<IInfoProps> = ({ children }) => {
    return <div className={'text-emerald-300 text-center'}>{children}</div>;
};

export default Info;
