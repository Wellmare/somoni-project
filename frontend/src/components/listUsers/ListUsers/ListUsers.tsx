import React, { FC, useState } from 'react';

import { IPaginatedResponse } from '../../../types/redux/IPaginatedResponse';
import { IUserServerResponse } from '../../../types/redux/profile/IUserServerResponse';
import Pagination from '../../../ui/Pagination/Pagination';
import { enhanceIUserServerResponse } from '../../../utils/enhanceIUserServerResponse';
import ListUser from '../ListUser/ListUser';

interface IListUsersProps {
    users: IPaginatedResponse<IUserServerResponse[]>;
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
            {usersList.map((user) => {
                const enhancedUser = enhanceIUserServerResponse(user);
                return <ListUser user={enhancedUser} key={enhancedUser.profileId} />;
            })}
            <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
        </div>
    );
};

export default ListUsers;
