import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';

import s from './PostAuthor.module.scss';

import { PostDate } from '../index';

interface IPostAuthorProps {
    username: string;
    photo: string;
    userId: string;
    date: string;
}

export const PostAuthor: FC<IPostAuthorProps> = ({ photo, username, userId, date }) => {
    return (
        <Link to={preparePathToNavigate.user(userId)} className={s.container}>
            <div className={classNames('flex', 'justify-start', 'items-center')}>
                <div>
                    <Avatar size={AvatarSize.small}>
                        <img src={photo} alt={username} />
                    </Avatar>
                </div>
                <div className={classNames('ml-3')}>
                    <div className={`${s.author}`}>{username}</div>
                    <PostDate date={date} />
                </div>
            </div>
        </Link>
    );
};
