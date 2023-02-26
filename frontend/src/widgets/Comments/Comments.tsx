import React, { FC } from 'react';

import { useGetCommentsQuery } from 'shared/api/comments/commentsApiSlice';
import { ServerResponse } from 'shared/components';
import { useAppSelector } from 'shared/hooks';
import { selectIsAuth } from 'shared/store/slices/authSlice';
import { Comment } from 'widgets/comment';
import { FormCreateComment } from 'widgets/forms';

interface ICommentsProps {
    postId: string;
}

export const Comments: FC<ICommentsProps> = ({ postId }) => {
    const { isSuccess, isLoading, data, error, isError } = useGetCommentsQuery({ postId });
    const isAuth = useAppSelector(selectIsAuth);

    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <h3 className={'font-medium mt-4 mb-3 text-center'}>Все комментарии: </h3>
                {isAuth && <FormCreateComment postId={postId} />}
                {data?.results?.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </ServerResponse>
        </>
    );
};
