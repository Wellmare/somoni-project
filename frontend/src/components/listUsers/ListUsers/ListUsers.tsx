import React, { FC, useState } from 'react';

import { IPaginatedResponse } from '../../../types/redux/IPaginatedResponse';
import { IUser } from '../../../types/redux/profile/IUser';
import Pagination from '../../../ui/Pagination/Pagination';
import ListUser from '../ListUser/ListUser';

interface IListUsersProps {
    users: IPaginatedResponse<IUser[]>;
}

const ListUsers: FC<IListUsersProps> = ({ users }) => {
    const { count, results: usersList } = users;
    const [page, setPage] = useState<number>(1);

    const countPages = count != null ? Math.ceil(count / 10) : 0;

    const handlePageChange = ({ selected }: { selected: number }): void => {
        const page = selected + 1;
        setPage(page);
    };

    return (
        <div>
            <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
            {usersList.map((user) => (
                <ListUser user={user} key={user.profileId} />
            ))}
            <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
        </div>
    );
};

export default ListUsers;
