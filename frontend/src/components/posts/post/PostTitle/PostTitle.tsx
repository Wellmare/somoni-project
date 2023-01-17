import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

interface IPostTitleProps {
    title: string;
    postId: string;
}

const PostTitle: FC<IPostTitleProps> = ({ title, postId }) => {
    return (
        <Link to={pathsToNavigate.post(postId)}>
            <h3>{title}</h3>
        </Link>
    );
};

export default PostTitle;
