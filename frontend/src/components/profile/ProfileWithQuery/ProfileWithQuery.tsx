import React, { FC, useState } from 'react';

import { useGetUserQuery } from '../../../service/userApiSlice';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination/Pagination';
import Error from '../../forms/Error/Error';
import Profile from '../Profile/Profile';

interface IProfileWithQueryProps {
    id: string;
}

const ProfileWithQuery: FC<IProfileWithQueryProps> = ({ id }) => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, isLoading, isError } = useGetUserQuery({ userId: id, postsPage: page });

    const handlePageChange = ({ selected }: { selected: number }): void => {
        setPage(selected + 1);
    };

    return (
        <div>
            {isSuccess && (
                <>
                    <Profile profile={data} />
                    <Pagination countPages={Math.ceil(data.count / 10)} handlePageChange={handlePageChange} />
                </>
            )}
            {isLoading && <Loader />}
            {isError && <Error>Something went wrong</Error>}
        </div>
    );
};

export default ProfileWithQuery;
