import React, { FC } from 'react';

import Error from '../../components/forms/Error/Error';
import ProfileWithQuery from '../../components/profile/ProfileWithQuery/ProfileWithQuery';
import { useAppSelector } from '../../hooks/reduxHooks';

const ProfilePage: FC = () => {
    const id = useAppSelector((state) => state.auth?.user?.user_id);

    if (id === undefined) {
        return <Error>Что то пошло не так(</Error>;
    }

    return <ProfileWithQuery id={id.toString()} />;
};

export default ProfilePage;
