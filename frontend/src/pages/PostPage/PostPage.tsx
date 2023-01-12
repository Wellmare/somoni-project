import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Comments from '../../components/Comments/Comments/Comments';
import ServerResponse from '../../components/common/ServerResponse/ServerResponse';
import Post from '../../components/Posts/Post/Post';
import { useGetPostQuery } from '../../service/postApiSlice';

const PostPage: FC = () => {
    const params = useParams();
    const postId = params.id;
    if (postId === undefined) {
        return <>Нет id поста</>;
    }

    const { isLoading, data: post, error, isError, isSuccess } = useGetPostQuery({ id: postId });

    return (
        <>
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={[{ statusCode: 404, message: 'Пост не найден' }]}
            >
                {post != null && <Post post={post} />}
                <Comments postId={postId} />
            </ServerResponse>
        </>
    );
};

export default PostPage;
