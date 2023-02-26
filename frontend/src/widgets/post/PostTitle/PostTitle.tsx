import { PostContext } from 'app/context';
import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';

import s from './PostTitle.module.scss';

export const PostTitle: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;

    const { postId, title } = post;

    return (
        <Link to={preparePathToNavigate.post(postId)}>
            <h3 className={`${s.title}`}>{title}</h3>
        </Link>
    );
};
