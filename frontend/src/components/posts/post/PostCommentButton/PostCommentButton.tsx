import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import comment from '../../../../assets/comment.svg';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import PostButton from '../PostButton/PostButton';

interface IPostCommentButtonProps {
    comments: number;
    postId: string;
}

const PostCommentButton: FC<IPostCommentButtonProps> = ({ comments, postId }) => {
    return (
        <Link to={pathsToNavigate.post(postId)}>
            <PostButton count={comments}>
                <img src={comment} alt='comment' />
            </PostButton>
        </Link>
    );
};

export default PostCommentButton;
