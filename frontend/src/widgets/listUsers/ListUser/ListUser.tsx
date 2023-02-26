import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';
import { IUser } from 'shared/types/IUser';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import { Card } from 'shared/ui/Card';

interface IListUserProps {
    user: IUser;
}

export const ListUser: FC<IListUserProps> = ({ user: { username, profileId, avatarLink } }) => {
    return (
        <Link to={preparePathToNavigate.user(profileId)}>
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
