import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import ProfileWithQuery from '../../components/profile/ProfileWithQuery/ProfileWithQuery';

const UserPage: FC = () => {
    const params = useParams();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;
    return <ProfileWithQuery id={id} />;
};

export default UserPage;
