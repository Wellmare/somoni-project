import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { IUser } from '../../../types/redux/profile/IUser';
import { AvatarSize } from '../../../types/UI/Avatar.types';
import Avatar from '../../../ui/Avatar/Avatar';
import Card from '../../../ui/Card/Card';
import { pathsToNavigate } from '../../../utils/pathsToNavigate';

interface IListUserProps {
    user: IUser;
}

const ListUser: FC<IListUserProps> = ({ user: { username, profileId, avatarLink } }) => {
    return (
        <Link to={pathsToNavigate.user(profileId)}>
            <Card className={'px-3 py-2'}>
                <div className={'flex items-center'}>
                    <Avatar size={AvatarSize.medium}>
                        <img src={avatarLink} alt={username} />
                    </Avatar>
                    <h4 className={'ml-3'}>{username}</h4>
                </div>
            </Card>
        </Link>
    );
};

export default ListUser;
