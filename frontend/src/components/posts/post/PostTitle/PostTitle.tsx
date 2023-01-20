import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { PostContext } from '../../../../context/PostContext';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

const PostTitle: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;

    const { postId, title } = post;

    return (
        <Link to={pathsToNavigate.post(postId)}>
            <h3>{title}</h3>
        </Link>
    );
};

export default PostTitle;
