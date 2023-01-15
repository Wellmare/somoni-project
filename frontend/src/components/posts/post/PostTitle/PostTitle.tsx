import React, { FC } from 'react';

interface IPostTitleProps {
    title: string;
}

const PostTitle: FC<IPostTitleProps> = ({ title }) => {
    return <h3>{title}</h3>;
};

export default PostTitle;
