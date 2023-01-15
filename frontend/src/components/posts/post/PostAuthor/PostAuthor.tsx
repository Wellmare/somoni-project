import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './PostAuthor.module.scss';

import { AvatarSize } from '../../../../types/UI/Avatar.types';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import Avatar from '../../../common/Avatar/Avatar';

interface IPostAuthorProps {
    username: string;
    photo: string;
    userId: string;
}

const PostAuthor: FC<IPostAuthorProps> = ({ photo, username, userId }) => {
    return (
        <Link to={pathsToNavigate.user(userId)} className={s.link}>
            <div className={classNames('flex', 'justify-start', 'items-center')}>
                <div>
                    <Avatar size={AvatarSize.small}>
                        <img src={photo} alt={username} />
                    </Avatar>
                </div>
                <div className={classNames('ml-5')}>{username}</div>
            </div>
        </Link>
    );
};

export default PostAuthor;
