import React, { FC } from 'react';

import { getLocalDateFromString } from '../../../../utils/getLocalDateFromString';

interface IPostDateProps {
    date: string;
}

const PostDate: FC<IPostDateProps> = ({ date }) => {
    const dateWithTime = getLocalDateFromString(date);

    return <div>{dateWithTime}</div>;
};

export default PostDate;
