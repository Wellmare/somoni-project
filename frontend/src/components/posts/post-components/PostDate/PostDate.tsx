import React, { FC } from 'react';

import s from './PostDate.module.scss';

import { getLocalDateFromString } from '../../../../utils/getLocalDateFromString';

interface IPostDateProps {
    date: string;
}

const PostDate: FC<IPostDateProps> = ({ date }) => {
    const dateWithTime = getLocalDateFromString(date);

    return <div className={s.date}>{dateWithTime}</div>;
};

export default PostDate;
