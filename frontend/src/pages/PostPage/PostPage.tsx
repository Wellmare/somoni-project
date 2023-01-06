import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import TestComments from '../../components/TestComments';
import TestPost from '../../components/TestPost';
import { useGetCommentsQuery } from '../../service/commentsApiSlice';
import { useGetPostQuery } from '../../service/postApiSlice';

const PostPage: FC = () => {
    const params = useParams();
    if (params.id === undefined) {
        return <>Post not found</>;
    }

    const { isLoading: postsIsLoading, data: post } = useGetPostQuery({ id: params.id });
    const { data: comments, isLoading: commentsIsLoading } = useGetCommentsQuery({ postId: params.id });

    return (
        <>
            {postsIsLoading && 'Loading...'}
            {post != null && <TestPost post={post} />}
            {commentsIsLoading && 'Loading...'}
            {comments?.results != null && <TestComments comments={comments.results} postId={params.id} />}
        </>
    );
};

export default PostPage;
