import { PostContext } from 'app/context';
import { ReactComponent as CommentIcon } from 'assets/svg/comment.svg';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';

import { Icon } from 'shared/ui/Icon';

import s from './PostCommentButton.module.scss';

import { PostButton } from '../index';

export const PostCommentButton: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { postId, commentsCount } = post;

    return (
        <Link to={preparePathToNavigate.post(postId)}>
            <PostButton count={commentsCount}>
                <Icon customTypeClassName={s.comment}>
                    <CommentIcon />
                </Icon>
            </PostButton>
        </Link>
    );
};
