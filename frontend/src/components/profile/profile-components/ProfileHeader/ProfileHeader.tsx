import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBio from '../ProfileBio/ProfileBio';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const ProfileHeader: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, isMyProfile } = profile;

    return (
        <div className={classNames('flex', 'justify-around', 'items-center', 'w-6/12', 'mx-auto')}>
            <div>
                <ProfileAvatar />
                <h2>{username}</h2>
                <ProfileBio />
            </div>
            <div>{isMyProfile && <ProfileMenu />}</div>
        </div>
    );
};

export default ProfileHeader;
