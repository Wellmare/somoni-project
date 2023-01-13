import React, { FC } from 'react';

import Error from '../../components/forms/Error/Error';
import ProfileWithQuery from '../../components/profile/ProfileWithQuery/ProfileWithQuery';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUserId } from '../../redux/slices/authSlice';

const ProfilePage: FC = () => {
    const id = useAppSelector(selectUserId);

    if (id === null) {
        return <Error>Что то пошло не так(</Error>;
    }

    return <ProfileWithQuery id={id} />;
};

export default ProfilePage;
