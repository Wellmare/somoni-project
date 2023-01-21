import classNames from 'classnames';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Error from '../../components/common/Error/Error';
import ServerResponse from '../../components/common/ServerResponse/ServerResponse';
import Post from '../../components/posts/post/Post/Post';
import Comments from '../../components/сomments/Comments/Comments';
import { useGetPostQuery } from '../../service/postApiSlice';
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
                <div className={classNames('w-6/12', 'mx-auto')}>
                    {post != null && <Post post={enhanceIPostServerResponse(post)} />}
                    <Comments postId={postId} />
                </div>
            </ServerResponse>
        </>
    );
};

export default PostPage;
