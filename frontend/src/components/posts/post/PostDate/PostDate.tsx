import React, { FC } from 'react';

interface IPostDateProps {
    date: string;
}

const PostDate: FC<IPostDateProps> = ({ date }) => {
    const parsedDate = new Date(date);

    const localeDate = parsedDate.toLocaleDateString();
    const time = `${parsedDate.getHours()}:${parsedDate.getMinutes()}`;

    const dateWithTime = `${localeDate}: ${time}`;

    return <div>{dateWithTime}</div>;
};

export default PostDate;
