import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import { AvatarSize } from '../../../../types/UI/Avatar.types';
import Avatar from '../../../common/Avatar/Avatar';

const ProfileAvatar: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, avatarLink } = profile;

    return (
        <Avatar size={AvatarSize.large}>
            <img src={avatarLink} alt={username} />
        </Avatar>
    );
};

export default ProfileAvatar;
