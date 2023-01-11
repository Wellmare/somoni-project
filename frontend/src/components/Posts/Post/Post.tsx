import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './Post.module.scss';

import { PathsToNavigate } from '../../../types/Paths';
import { IPost } from '../../../types/redux/posts/IPost';
import Content from '../Content/Content';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const { content, username, title, likes, id, image } = post;
    return (
        <div className={classNames(s.post)}>
            {image !== null && <img src={image} alt='image' className={classNames(s.image)} />}
            <div className={'flex justify-between'}>
                <p>{username}</p>
                <Link to={`${PathsToNavigate.POST}/${id}`}>
                    <p>{title}</p>
                </Link>
            </div>
            <div className={'flex justify-between'}>
                <Content value={content} />
                <p>{likes}</p>
            </div>
        </div>
    );
};

export default Post;
