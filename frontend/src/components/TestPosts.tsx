import React, { FC, useState } from 'react';

import TestPost from './TestPost';

import { useGetPostsQuery } from '../service/postsApiSlice';

const TestPosts: FC = () => {
    const [page, setPage] = useState<number>(1);
    const { data, error, isLoading } = useGetPostsQuery({ page });

    // const onPosts = (): void => {
    //     doAsyncFunc(async () => {
    //         try {
    //             await getPosts({ page: 1 });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     });
    // };

    const nextPage = (): void => {
        console.log(data?.count);
        if (data?.next !== null) {
            setPage((page) => page + 1);
        }
    };
    const prevPage = (): void => {
        if (page - 1 > 0) {
            setPage((page) => page - 1);
        }
    };

    return (
        <>
            <button onClick={prevPage}>PREV PAGE</button>
            <button onClick={nextPage}>NEXT PAGE</button>
            {isLoading ?? 'Loading...'}
            {data?.results.map((post) => (
                <TestPost key={post.id} post={post} />
            ))}
        </>
    );
};

export default TestPosts;
