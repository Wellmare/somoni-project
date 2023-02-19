import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { IUser } from '../../../types/redux/profile/IUser';
import { AvatarSize } from '../../../types/UI/Avatar.types';
import Avatar from '../../../ui/Avatar/Avatar';
import { pathsToNavigate } from '../../../utils/pathsToNavigate';

interface IListUserProps {
    user: IUser;
}

const ListUser: FC<IListUserProps> = ({ user: { username, profileId, avatarLink } }) => {
    return (
        <Link to={pathsToNavigate.user(profileId)}>
            <div className={'flex items-start'}>
                <Avatar size={AvatarSize.small}>
                    <img src={avatarLink} alt={username} />
                </Avatar>
                <h4>{username}</h4>
            </div>
        </Link>
    );
};

export default ListUser;
