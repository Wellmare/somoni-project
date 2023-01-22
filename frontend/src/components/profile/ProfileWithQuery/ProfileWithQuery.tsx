import React, { FC, useState } from 'react';

import { useGetUserQuery } from '../../../service/userApiSlice';
import Pagination from '../../../ui/Pagination/Pagination';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import ProfileSkeleton from '../../skeletons/ProfileSkeleton';
import Profile from '../profile-components/Profile/Profile';

interface IProfileWithQueryProps {
    id: string;
}

const ProfileWithQuery: FC<IProfileWithQueryProps> = ({ id }) => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, isLoading, isError, error } = useGetUserQuery({ userId: id, postsPage: page });

    const handlePageChange = ({ selected }: { selected: number }): void => {
        setPage(selected + 1);
    };

    return (
        <div>
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={[{ statusCode: 404, message: 'Профиль не найден' }]}
                loader={<ProfileSkeleton />}
            >
                {data != null && (
                    <>
                        <Profile profile={data} />
                        {data?.results !== null && data.results.length > 0 && (
                            <Pagination countPages={Math.ceil(data.count / 10)} handlePageChange={handlePageChange} />
                        )}
                    </>
                )}
            </ServerResponse>
        </div>
    );
};

export default ProfileWithQuery;
