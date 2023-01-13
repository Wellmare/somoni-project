import React, { FC } from 'react';

import ServerResponse from '../../components/common/ServerResponse/ServerResponse';
import EditProfileForm from '../../components/forms/EditProfileForm/EditProfileForm';
import { useGetDataToEditUserQuery } from '../../service/userApiSlice';

const EditProfilePage: FC = () => {
    const { data, error, isError, isLoading, isSuccess } = useGetDataToEditUserQuery(undefined);

    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && (
                    <EditProfileForm
                        defaultValues={{
                            username: data.username,
                            bio: data.bio === null ? undefined : data.bio,
                            email: data.email,
                        }}
                        photo={data.photo}
                    />
                )}
            </ServerResponse>
        </>
    );
};

export default EditProfilePage;
