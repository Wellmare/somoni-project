import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';
import { preparePathToNavigate } from 'shared/lib/path';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';

export const ProfileAvatar: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, avatarLink, profileId } = profile;

    return (
        <div className={'flex-shrink-0'}>
            <Avatar size={AvatarSize.large}>
                <Link to={preparePathToNavigate.user(profileId)}>
                    <img src={avatarLink} alt={username} />
                </Link>
            </Avatar>
        </div>
    );
};
