import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from 'shared/api/post/postApiSlice';
import { ServerResponse } from 'shared/components';
import { Error } from 'shared/ui/Error';
import { FormEditPost } from 'widgets/forms';

import s from './EditPostPage.module.scss';

export const EditPostPage: FC = () => {
    const { id: postId } = useParams();
    if (postId === undefined) {
        return <Error>Нет id поста</Error>;
    }

    const { error, isError, isLoading, isSuccess, data } = useGetPostQuery({ id: postId });

    if (data !== undefined && !data.isMyPost) {
        return <Error>Это не твой пост!</Error>;
    }

    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && (
                    <FormEditPost
                        defaultValues={{ tags: data.tags.join(' '), content: data.content, title: data.title }}
                        image={data.image}
                        postId={postId}
                    />
                )}
            </ServerResponse>
        </div>
    );
};
