import React, { FC, useEffect, useState } from 'react';

import { useGetPostsQuery } from '../../../service/postsApiSlice';
import Loader from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination/Pagination';
import Error from '../../forms/Error/Error';
import Post from '../Post/Post';

interface IPostsByPageProps {
    page: number;
    setPage: (page: number) => void;
}

const PostsByPage: FC<IPostsByPageProps> = ({ page, setPage }) => {
    const [content, setContent] = useState<JSX.Element | JSX.Element[]>(<Loader />);
    const { data: posts, isError, isLoading, isSuccess } = useGetPostsQuery({ page });

    const countPages = posts?.count != null ? posts.count / 10 : 0;

    const handlePageChange = ({ selected }: { selected: number }): void => {
        const page = selected + 1;
        setPage(page);
    };

    useEffect(() => {
        if (isError) {
            setContent(<Error>Failed to fetch</Error>);
        } else if (isLoading) {
            setContent(<Loader />);
        } else if (isSuccess && posts.results.length > 0) {
            setContent(
                <>
                    <Pagination countPages={countPages} handlePageChange={handlePageChange} />
                    {posts.results.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                    <Pagination countPages={countPages} handlePageChange={handlePageChange} />
                </>,
            );
        }
    }, [posts, isError, isLoading, isSuccess]);

    return <>{content}</>;
};

export default PostsByPage;
