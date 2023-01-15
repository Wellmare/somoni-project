import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import comment from '../../../../assets/comment.svg';

import { PathsToNavigate } from '../../../../constants/Paths';
import PostButton from '../PostButton/PostButton';

interface IPostCommentButtonProps {
    comments: number;
    postId: string;
}

const PostCommentButton: FC<IPostCommentButtonProps> = ({ comments, postId }) => {
    return (
        <Link to={`${PathsToNavigate.POST}/${postId}`}>
            <PostButton count={comments}>
                <img src={comment} alt='comment' />
            </PostButton>
        </Link>
    );
};

export default PostCommentButton;
