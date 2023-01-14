import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './Post.module.scss';

import { PathsToNavigate } from '../../../constants/Paths';
import { IPost } from '../../../types/redux/posts/IPost';
import Content from '../Content/Content';
import Tag from '../Tag/Tag';

interface ITestPostProps {
    post: IPost;
}

const Post: FC<ITestPostProps> = ({ post }) => {
    const { content, username, title, likes, id, image, author: authorId, tags } = post;
    return (
        <div className={classNames(s.post)}>
            {image !== null && <img src={image} alt='image' className={classNames(s.image)} />}
            <div className={'flex justify-between'}>
                <Link to={`${PathsToNavigate.USER}/${authorId}`}>
                    <p>{username}</p>
                </Link>
                <Link to={`${PathsToNavigate.POST}/${id}`}>
                    <p>{title}</p>
                </Link>
            </div>
            <div className={'flex justify-between'}>
                <Content value={content} />
                <p>{likes}</p>
                <div className={classNames('mt-auto', 'flex', 'justify-around')}>
                    {tags?.length > 0 && tags.map((tag) => <Tag tag={tag} key={tag} />)}
                </div>
            </div>
        </div>
    );
};

export default Post;
