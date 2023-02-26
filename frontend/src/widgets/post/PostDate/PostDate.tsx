import React, { FC } from 'react';

import { getLocalDateFromString } from 'shared/lib/string';

import s from './PostDate.module.scss';

interface IPostDateProps {
    date: string;
}

export const PostDate: FC<IPostDateProps> = ({ date }) => {
    const dateWithTime = getLocalDateFromString(date);

    return <div className={s.date}>{dateWithTime}</div>;
};
