import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import s from './PostCommentButton.module.scss';

import { ReactComponent as CommentIcon } from '../../../../assets/svg/comment.svg';
import { PostContext } from '../../../../context/PostContext';
import Icon from '../../../../ui/Icon/Icon';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import PostButton from '../PostButton/PostButton';

const PostCommentButton: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { postId, commentsCount } = post;

    return (
        <Link to={pathsToNavigate.post(postId)}>
            <PostButton count={commentsCount}>
                <Icon customTypeClassName={s.comment}>
                    <CommentIcon />
                </Icon>
            </PostButton>
        </Link>
    );
};

export default PostCommentButton;
