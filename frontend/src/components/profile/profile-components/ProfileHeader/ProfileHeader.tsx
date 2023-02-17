import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import s from './ProfileHeader.module.scss';

import { ProfileContext } from '../../../../context/ProfileContext';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileBio from '../ProfileBio/ProfileBio';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const ProfileHeader: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, isMyProfile } = profile;

    return (
        <div className={classNames('flex', 'justify-between', 'items-start')}>
            <div className={classNames('flex', 'justify-start', 'items-start', 'flex-col', 'sm:flex-row')}>
                <ProfileAvatar />
                <div className={'ml-4'}>
                    <h2 className={`${s.username}`}>{username}</h2>
                    <ProfileBio />
                </div>
            </div>
            <div className={'mt-5'}>{isMyProfile && <ProfileMenu />}</div>
        </div>
    );
};

export default ProfileHeader;
