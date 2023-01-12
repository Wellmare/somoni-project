import React, { FC, useEffect } from 'react';

import ServerResponse from '../../components/common/ServerResponse/ServerResponse';
import EditProfileForm from '../../components/forms/EditProfileForm/EditProfileForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useLazyGetUserQuery } from '../../service/userApiSlice';
import { doAsyncFunc } from '../../utils/doAsyncFunc';

const EditProfilePage: FC = () => {
    const userId = useAppSelector((state) => state?.auth?.user?.user_id);
    const user = useAppSelector((state) => state?.auth?.user);
    const [getUser, { error, isError, isLoading, data, isSuccess }] = useLazyGetUserQuery();

    useEffect(() => {
        if (userId !== undefined) {
            doAsyncFunc(async () => {
                await getUser({ userId: userId.toString() });
            });
        }
    }, []);

    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && user !== null && (
                    <EditProfileForm
                        defaultValues={{
                            username: data.username,
                            bio: data.bio === null ? undefined : data.bio,
                            email: user.email,
                        }}
                    />
                )}
            </ServerResponse>
        </>
    );
};

export default EditProfilePage;
