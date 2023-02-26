import React, { FC } from 'react';

import { PostCommentButton, PostLikeButton } from '../index';

export const PostButtons: FC = () => {
    return (
        <div className={'flex items-center'}>
            <PostLikeButton />
            <PostCommentButton />
        </div>
    );
};
