import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Error from '../../components/common/Error/Error';
import ServerResponse from '../../components/common/ServerResponse/ServerResponse';
import FormEditPost from '../../components/forms/post/FormEditPost/FormEditPost';
import { useGetPostQuery } from '../../service/postApiSlice';

const EditPostPage: FC = () => {
    const { id: postId } = useParams();
    if (postId === undefined) {
        return <Error>Нет id поста</Error>;
    }

    const { error, isError, isLoading, isSuccess, data } = useGetPostQuery({ id: postId });

    if (data !== undefined && !data.isMyPost) {
        return <Error>Это не твой пост!</Error>;
    }

    return (
        <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
            {data !== undefined && (
                <FormEditPost
                    defaultValues={{ tags: data.tags.join(' '), content: data.content, title: data.title }}
                    image={data.image}
                    postId={postId}
                />
            )}
        </ServerResponse>
    );
};

export default EditPostPage;
