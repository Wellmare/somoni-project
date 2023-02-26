import React, { FC, useState } from 'react';

import { useGetUserQuery } from 'shared/api/user/userApiSlice';
import { ServerResponse } from 'shared/components';
import { Pagination } from 'widgets/Pagination';
import { Profile } from 'widgets/profile/profile-components';
import { ProfileSkeleton } from 'widgets/skeletons';

interface IProfileWithQueryProps {
    id: string;
}

export const ProfileWithQuery: FC<IProfileWithQueryProps> = ({ id }) => {
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
                            <Pagination
                                currentPage={page - 1}
                                countPages={Math.ceil(data.count / 10)}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </ServerResponse>
        </div>
    );
};
