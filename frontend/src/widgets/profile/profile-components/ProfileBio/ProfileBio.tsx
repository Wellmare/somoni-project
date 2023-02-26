import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC, useContext } from 'react';

export const ProfileBio: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { bio } = profile;

    return <div className={'text-center'}>{bio === null || bio === '' ? 'Не установлен' : bio}</div>;
};
