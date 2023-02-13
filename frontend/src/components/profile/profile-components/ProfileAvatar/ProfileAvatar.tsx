import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import { ProfileContext } from '../../../../context/ProfileContext';
import { AvatarSize } from '../../../../types/UI/Avatar.types';
import Avatar from '../../../../ui/Avatar/Avatar';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

const ProfileAvatar: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, avatarLink, profileId } = profile;

    return (
        <div className={'flex-shrink-0'}>
            <Avatar size={AvatarSize.large}>
                <Link to={pathsToNavigate.user(profileId)}>
                    <img src={avatarLink} alt={username} />
                </Link>
            </Avatar>
        </div>
    );
};

export default ProfileAvatar;
