import React, { FC } from 'react';

import { PostSkeleton } from './PostSkeleton';

export const PostsSkeleton: FC = () => {
    const postsCount = 10;
    const posts = Array.from(Array(postsCount).keys()).map((i) => <PostSkeleton key={i} />);

    return <>{posts}</>;
};
