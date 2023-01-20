import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import comment from '../../../../assets/comment.svg';
import { PostContext } from '../../../../context/PostContext';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import PostButton from '../PostButton/PostButton';

const PostCommentButton: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { postId, commentsCount } = post;

    return (
        <Link to={pathsToNavigate.post(postId)}>
            <PostButton count={commentsCount}>
                <img src={comment} alt='comment' />
            </PostButton>
        </Link>
    );
};

export default PostCommentButton;
