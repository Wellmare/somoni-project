import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC, useContext } from 'react';

import { ProfileStat } from '../index';

export const ProfileStats: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { countFollowing, countFollowers } = profile;

    return (
        <div className={'flex justify-center items-center my-3'}>
            <ProfileStat statName={'Подписчиков'} stat={countFollowers} className={'mr-3'} link={'followers'} />
            <ProfileStat statName={'Подписки'} stat={countFollowing} link={'following'} />
        </div>
    );
};
