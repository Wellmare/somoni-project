import React, { FC } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectIsAuth } from '../../../redux/slices/authSlice';
import { useGetCommentsQuery } from '../../../service/commentsApiSlice';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import FormCreateComment from '../../forms/FormCreateComment/FormCreateComment';
import Comment from '../Comment/Comment';

interface ICommentsProps {
    postId: string;
}

const Comments: FC<ICommentsProps> = ({ postId }) => {
    const { isSuccess, isLoading, data, error, isError } = useGetCommentsQuery({ postId });
    const isAuth = useAppSelector(selectIsAuth);

    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {isAuth && <FormCreateComment postId={postId} />}
                {data?.results?.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </ServerResponse>
        </>
    );
};

export default Comments;
