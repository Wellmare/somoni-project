import React, { FC, useState } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';
import { useGetUserQuery } from '../../../service/userApiSlice';
import Pagination from '../../common/Pagination/Pagination';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import ProfileSkeleton from '../../skeletons/ProfileSkeleton';
import Profile from '../Profile/Profile';

interface IProfileWithQueryProps {
    id: string;
}

const ProfileWithQuery: FC<IProfileWithQueryProps> = ({ id }) => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, isLoading, isError, error } = useGetUserQuery({ userId: id, postsPage: page });
    const myId = useAppSelector((state) => state?.auth?.user?.user_id);

    const handlePageChange = ({ selected }: { selected: number }): void => {
        setPage(selected + 1);
    };

    const isMyProfile = myId !== undefined && myId.toString() === id;

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
                        <Profile profile={data} withEdit={isMyProfile} />
                        <Pagination countPages={Math.ceil(data.count / 10)} handlePageChange={handlePageChange} />
                    </>
                )}
            </ServerResponse>
        </div>
    );
};

export default ProfileWithQuery;
