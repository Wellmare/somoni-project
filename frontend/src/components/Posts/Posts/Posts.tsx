import React, { FC, useState } from 'react';

import PostsByPage from '../PostsByPage/PostsByPage';

const Posts: FC = () => {
    const [page, setPage] = useState<number>(1);

    return (
        <>
            <PostsByPage page={page} setPage={setPage} />
        </>
    );
};

export default Posts;
