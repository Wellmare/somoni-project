import React, { FC } from 'react';

import { useGetPostsQuery } from '../../../service/postsApiSlice';
import Pagination from '../../common/Pagination/Pagination';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import PostsSkeletons from '../../skeletons/PostsSkeletons';
import Post from '../post/Post/Post';

interface IPostsByPageProps {
    page: number;
    setPage: (page: number) => void;
    tag?: string;
}

const PostsByPage: FC<IPostsByPageProps> = ({ page, setPage, tag }) => {
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
                loader={<PostsSkeletons />}
            >
                <Pagination countPages={countPages} handlePageChange={handlePageChange} />
                {posts?.results?.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                <Pagination countPages={countPages} handlePageChange={handlePageChange} />
            </ServerResponse>
        </>
    );
};

export default PostsByPage;
