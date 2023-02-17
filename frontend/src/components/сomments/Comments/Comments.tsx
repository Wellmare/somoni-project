import React, { FC } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectIsAuth } from '../../../redux/slices/authSlice';
import { useGetCommentsQuery } from '../../../service/commentsApiSlice';
import FormCreateComment from '../../forms/comments/FormCreateComment/FormCreateComment';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import Comment from '../comment-components/Comment/Comment';

interface ICommentsProps {
    postId: string;
}

const Comments: FC<ICommentsProps> = ({ postId }) => {
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

export default Comments;
