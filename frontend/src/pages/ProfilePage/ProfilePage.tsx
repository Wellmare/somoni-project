import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {
    const params = useParams();
    console.log(params);

    console.log(params.id);

    return <div>{params.id !== undefined ? +params.id : 'My profile'}</div>;
};

export default ProfilePage;
