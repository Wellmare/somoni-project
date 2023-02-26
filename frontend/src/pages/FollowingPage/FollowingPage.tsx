import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFollowingOnProfileQuery } from 'shared/api/user/userApiSlice';
import { ServerResponse } from 'shared/components';
import { ListUsers } from 'widgets/listUsers';

export const FollowingPage: FC = () => {
    const params = useParams();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;
    const { data, isLoading, isSuccess, error, isError } = useGetFollowingOnProfileQuery({ userId: id });

    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && <ListUsers users={data} />}
            </ServerResponse>
        </>
    );
};
