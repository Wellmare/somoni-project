import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import EditProfileButton from '../EditProfileButton/EditProfileButton';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBio from '../ProfileBio/ProfileBio';

const ProfileHeader: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, isMyProfile } = profile;

    return (
        <div>
            <ProfileAvatar />
            <h2>{username}</h2>
            <ProfileBio />
            {isMyProfile && <EditProfileButton />}
        </div>
    );
};

export default ProfileHeader;
