import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { PostContext } from '../../../../context/PostContext';
import PostAuthor from '../PostAuthor/PostAuthor';
import PostDeleteButton from '../PostDeleteButton/PostDeleteButton';
import PostEditButton from '../PostEditButton/PostEditButton';

// interface IPostHeaderProps {
//     username: string;
//     photo: string;
//     userId: string;
//     isMyPost: boolean;
//     postId: string;
// }
const PostHeader: FC = () => {
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

export default PostHeader;
