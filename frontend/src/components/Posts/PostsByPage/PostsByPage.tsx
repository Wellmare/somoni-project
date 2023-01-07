import React, { FC } from 'react';

import { useGetPostsQuery } from '../../../service/postsApiSlice';
import Pagination from '../../common/Pagination/Pagination';
import Post from '../Post/Post';

interface IPostsByPageProps {
    page: number;
    setPage: (page: number) => void;
}

const PostsByPage: FC<IPostsByPageProps> = ({ page, setPage }) => {
    const { data: posts, isError, isLoading } = useGetPostsQuery({ page });
    const countPages = posts?.count != null ? posts.count / 10 : 1;

    const handlePageChange = ({ selected }: { selected: number }): void => {
        const page = selected + 1;
        setPage(page);
    };

    return (
        <>
            <Pagination countPages={countPages} handlePageChange={handlePageChange} />
            {isLoading && 'Loading...'}
            {isError && 'Failed to fetch'}
            {posts?.results != null && posts.results.map((post) => <Post post={post} key={post.id} />)}
            <Pagination countPages={countPages} handlePageChange={handlePageChange} />
        </>
    );
};

export default PostsByPage;
