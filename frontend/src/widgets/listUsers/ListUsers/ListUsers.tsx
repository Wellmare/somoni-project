import React, { FC, useState } from 'react';

import { IUserServerResponse } from 'shared/api/user/types/IUserServerResponse';
import { enhanceIUserServerResponse } from 'shared/lib/server/enhanceIUserServerResponse';
import { IPaginatedResponse } from 'shared/types/server/IPaginatedResponse';

import { Pagination } from 'widgets/Pagination';

import { ListUser } from '../index';

interface IListUsersProps {
    users: IPaginatedResponse<IUserServerResponse[]>;
}

export const ListUsers: FC<IListUsersProps> = ({ users }) => {
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
