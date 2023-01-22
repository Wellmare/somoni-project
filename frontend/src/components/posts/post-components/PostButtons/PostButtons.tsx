import React, { FC } from 'react';

import PostCommentButton from '../PostCommentButton/PostCommentButton';
import PostLikeButton from '../PostLikeButton/PostLikeButton';

const PostButtons: FC = () => {
    return (
        <div className={'flex items-center'}>
            <PostLikeButton />
            <PostCommentButton />
        </div>
    );
};

export default PostButtons;
