import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import { AvatarSize } from '../../../../types/UI/Avatar.types';
import Avatar from '../../../../ui/Avatar/Avatar';

const ProfileAvatar: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, avatarLink } = profile;

    return (
        <Avatar size={AvatarSize.large}>
            <a href={avatarLink} target={'_blank'} rel='noreferrer'>
                <img src={avatarLink} alt={username} />
            </a>
        </Avatar>
    );
};

export default ProfileAvatar;
