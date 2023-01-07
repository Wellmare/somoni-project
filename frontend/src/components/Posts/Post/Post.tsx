import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Post.module.scss';

import { IPost } from '../../../types/redux/posts/IPost';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const { content, username, title, likes } = post;
    return (
        <div className={classNames(s.post)}>
            <div className={'flex justify-between'}>
                <p>{username}</p>
                <p>{title}</p>
            </div>
            <div className={'flex justify-between'}>
                <p>{content}</p>
                <p>{likes}</p>
            </div>
        </div>
    );
};

export default Post;
