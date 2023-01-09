import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './Post.module.scss';

import { PathsToNavigate } from '../../../types/Paths';
import { IPost } from '../../../types/redux/posts/IPost';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const { content, username, title, likes, id } = post;
    return (
        <div className={classNames(s.post)}>
            <div className={'flex justify-between'}>
                <p>{username}</p>
                <Link to={`${PathsToNavigate.POST}/${id}`}>
                    <p>{title}</p>
                </Link>
            </div>
            <div className={'flex justify-between'}>
                <p>{content}</p>
                <p>{likes}</p>
            </div>
        </div>
    );
};

export default Post;
