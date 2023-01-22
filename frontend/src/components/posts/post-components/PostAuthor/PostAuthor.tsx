import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './PostAuthor.module.scss';

import { AvatarSize } from '../../../../types/UI/Avatar.types';
import Avatar from '../../../../ui/Avatar/Avatar';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import PostDate from '../PostDate/PostDate';

interface IPostAuthorProps {
    username: string;
    photo: string;
    userId: string;
    date: string;
}

const PostAuthor: FC<IPostAuthorProps> = ({ photo, username, userId, date }) => {
    return (
        <Link to={pathsToNavigate.user(userId)} className={s.link}>
            <div className={classNames('flex', 'justify-start', 'items-center')}>
                <div>
                    <Avatar size={AvatarSize.small}>
                        <img src={photo} alt={username} />
                    </Avatar>
                </div>
                <div className={classNames('ml-5')}>
                    <div>{username}</div>
                    <PostDate date={date} />
                </div>
            </div>
        </Link>
    );
};

export default PostAuthor;
