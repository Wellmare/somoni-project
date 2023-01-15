import React, { FC } from 'react';

import PostCommentButton from '../PostCommentButton/PostCommentButton';
import PostLikeButton from '../PostLikeButton/PostLikeButton';

interface IPostButtonsProps {
    isLiked: boolean;
    postId: string;
    countLikes: number;
    countComments: number;
}

const PostButtons: FC<IPostButtonsProps> = ({ isLiked, countLikes, postId, countComments }) => {
    return (
        <div className={'flex items-center'}>
            <PostLikeButton isLiked={isLiked} postId={postId} countLikes={countLikes} />
            <PostCommentButton comments={countComments} postId={postId} />
        </div>
    );
};

export default PostButtons;
