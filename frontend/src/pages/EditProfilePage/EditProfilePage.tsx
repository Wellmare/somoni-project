import React, { FC } from 'react';

import EditProfileForm from '../../components/forms/profile/EditProfileForm/EditProfileForm';
import ServerResponse from '../../components/server/ServerResponse/ServerResponse';
import { useGetDataToEditUserQuery } from '../../service/userApiSlice';

const EditProfilePage: FC = () => {
    const { data, error, isError, isLoading, isSuccess } = useGetDataToEditUserQuery(undefined);
    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && (
                    <EditProfileForm
                        defaultValues={{
                            bio: data.bio === null ? undefined : data.bio,
                            email: data.email,
                        }}
                        photo={data.photo}
                        id={data.id != null ? data.id : '1'}
                    />
                )}
            </ServerResponse>
        </>
    );
};

export default EditProfilePage;
