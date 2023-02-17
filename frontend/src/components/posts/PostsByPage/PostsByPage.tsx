import React, { FC } from 'react';

import { useGetPostsQuery } from '../../../service/postsApiSlice';
import Pagination from '../../../ui/Pagination/Pagination';
import { enhanceIPostServerResponse } from '../../../utils/enhanceIPostServerResponse';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import PostsSkeletons from '../../skeletons/PostsSkeletons';
import Post from '../post-components/Post/Post';

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
                {/* <div className={'w-screen'}> */}
                <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
                {posts?.results?.map((post) => (
                    <Post post={enhanceIPostServerResponse(post)} key={post.id} />
                ))}
                <Pagination currentPage={page - 1} countPages={countPages} handlePageChange={handlePageChange} />
                {/* </div> */}
            </ServerResponse>
        </>
    );
};

export default PostsByPage;
