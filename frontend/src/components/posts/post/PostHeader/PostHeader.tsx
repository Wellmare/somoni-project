import classNames from 'classnames';
import React, { FC } from 'react';

import { IPost } from '../../../../types/redux/posts/IPost';
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
interface IPostHeaderProps {
    post: IPost;
}

const PostHeader: FC<IPostHeaderProps> = ({ post }) => {
    const { isMyPost, username, date, id, photo, author } = post;
    const postId = id.toString();
    const userId = author.toString();

    return (
        <div className={classNames('flex', 'justify-between', 'items-center')}>
            <div>
                <PostAuthor username={username} photo={photo} userId={userId} date={date} />
            </div>
            <div>
                {isMyPost && (
                    <div className={classNames('flex', 'items-center')}>
                        <PostEditButton postId={postId} />
                        <PostDeleteButton postId={postId} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostHeader;
