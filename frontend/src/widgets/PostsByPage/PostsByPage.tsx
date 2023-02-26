import React, { FC, useState } from 'react';

import { useGetPostsQuery } from 'shared/api/posts/postsApiSlice';
import { ServerResponse } from 'shared/components';
import { enhanceIPostServerResponse } from 'shared/lib/server';
import { Pagination } from 'widgets/Pagination';
import { Post } from 'widgets/post';
import { PostsSkeleton } from 'widgets/skeletons';

interface IPostsByPageProps {
    initPage?: number;
    tag?: string;
}

export const PostsByPage: FC<IPostsByPageProps> = ({ initPage = 1, tag }) => {
    const [page, setPage] = useState(initPage);

    const { data: posts, isError, isLoading, isSuccess, error } = useGetPostsQuery({ page, tag });

    const countPages = posts?.count != null ? Math.ceil(posts.count / 10) : 0;

    const handlePageChange = ({ selected }: { selected: number }): void => {
        const page = selected + 1;
        setPage(page);
    };

    return (
        <>
            <ServerResponse
                responseError={error}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                messages={[{ statusCode: 404, message: 'Посты не найдены' }]}
                loader={<PostsSkeleton />}
            >
                {/* <div className={'w-screen'}> */}
                <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
                {posts?.results?.map((post) => (
                    <Post limitContentView={true} post={enhanceIPostServerResponse(post)} key={post.id} />
                ))}
                <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
                {/* </div> */}
            </ServerResponse>
        </>
    );
};
