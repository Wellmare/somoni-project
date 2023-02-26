import { PostContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { PostAuthor, PostDeleteButton, PostEditButton } from '../index';

export const PostHeader: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) {
        return null;
    }

    const { isMyPost, username, avatarLink, dateString, userId, postId } = post;

    return (
        <div className={classNames('flex', 'justify-between', 'items-center')}>
            <PostAuthor username={username} photo={avatarLink} userId={userId} date={dateString} />
            {isMyPost && (
                <div className={classNames('flex', 'items-center')}>
                    <PostEditButton postId={postId} />
                    <PostDeleteButton postId={postId} />
                </div>
            )}
        </div>
    );
};
