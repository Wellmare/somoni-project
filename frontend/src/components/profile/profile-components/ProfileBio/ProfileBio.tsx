import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';

const ProfileBio: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { bio } = profile;

    return <div className={'text-center'}>{bio === null || bio === '' ? 'Не установлен' : bio}</div>;
};

export default ProfileBio;
