import classNames from 'classnames';
import React, { FC } from 'react';

import PostAuthor from '../PostAuthor/PostAuthor';
import PostDeleteButton from '../PostDeleteButton/PostDeleteButton';
import PostEditButton from '../PostEditButton/PostEditButton';

interface IPostHeaderProps {
    username: string;
    photo: string;
    userId: string;
    isMyPost: boolean;
    postId: string;
}

const PostHeader: FC<IPostHeaderProps> = ({ isMyPost, username, userId, photo, postId }) => {
    return (
        <div className={classNames('flex', 'justify-between', 'items-center')}>
            <PostAuthor username={username} photo={photo} userId={userId} />
            {isMyPost && (
                <div className={classNames('flex', 'items-center')}>
                    <PostEditButton postId={postId} />
                    <PostDeleteButton postId={postId} />
                </div>
            )}
        </div>
    );
};

export default PostHeader;
