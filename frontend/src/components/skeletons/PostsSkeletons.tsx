import React, { FC } from 'react';

import PostSkeleton from './PostSkeleton';

const PostsSkeletons: FC = () => {
    const postsCount = 10;
    const posts = Array.from(Array(postsCount).keys()).map((i) => <PostSkeleton key={i} />);

    return <>{posts}</>;
};

export default PostsSkeletons;
