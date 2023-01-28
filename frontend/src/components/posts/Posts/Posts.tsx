import React, { FC, useState } from 'react';

import PostsByPage from '../PostsByPage/PostsByPage';

interface IPostsProps {
    tag?: string;
}

const Posts: FC<IPostsProps> = ({ tag }) => {
    const [page, setPage] = useState<number>(1);

    return (
        <div>
            <PostsByPage page={page} setPage={setPage} tag={tag} />
        </div>
    );
};

export default Posts;
