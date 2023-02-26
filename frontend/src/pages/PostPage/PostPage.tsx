import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from 'shared/api/post/postApiSlice';
import { ServerResponse } from 'shared/components';
import { enhanceIPostServerResponse } from 'shared/lib/server/enhanceIPostServerResponse';
import { Error } from 'shared/ui/Error';
import { Comments } from 'widgets/Comments';
import { Post } from 'widgets/post';

export const PostPage: FC = () => {
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
