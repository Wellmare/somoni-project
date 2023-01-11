import React, { FC } from 'react';

import { useGetCommentsQuery } from '../../../service/commentsApiSlice';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import Comment from '../Comment/Comment';

interface ICommentsProps {
    postId: string;
}

const Comments: FC<ICommentsProps> = ({ postId }) => {
    const { isSuccess, isLoading, data, error, isError } = useGetCommentsQuery({ postId });
    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data?.results?.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </ServerResponse>
        </>
    );
};

export default Comments;
