import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Post from '../../components/posts/post-components/Post/Post';
import ServerResponse from '../../components/server/ServerResponse/ServerResponse';
import Comments from '../../components/сomments/Comments/Comments';
import { useGetPostQuery } from '../../service/postApiSlice';
import Error from '../../ui/Error/Error';
import { enhanceIPostServerResponse } from '../../utils/enhanceIPostServerResponse';

const PostPage: FC = () => {
    const params = useParams();
    const postId = params.id;
    if (postId === undefined) {
        return <Error>Нет id поста</Error>;
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
                {post != null && <Post post={enhanceIPostServerResponse(post)} />}
                <Comments postId={postId} />
            </ServerResponse>
        </>
    );
};

export default PostPage;
