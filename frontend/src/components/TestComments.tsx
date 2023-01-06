import React, { FC } from 'react';

import TestComment from './TestComment';

import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useEditCommentMutation,
} from '../service/commentsApiSlice';
import { IComment } from '../types/redux/commentsSlice.types';
import { doAsyncFunc } from '../utils/doAsyncFunc';

interface ITestCommentsProps {
    comments: IComment[];
    postId: string;
}

const TestComments: FC<ITestCommentsProps> = ({ comments, postId }) => {
    const [createComment] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [editComment] = useEditCommentMutation();

    const onCreateComment = (): void => {
        doAsyncFunc(async () => {
            await createComment({ postId, content: 'Test comment' });
        });
    };
    const onEditComment = (): void => {
        doAsyncFunc(async () => {
            await editComment({ commentId: '40', content: 'EDITED' });
        });
    };

    const onDeleteComment = (): void => {
        doAsyncFunc(async () => {
            await deleteComment({ commentId: '40' });
        });
    };

    return (
        <>
            <button onClick={onCreateComment}>Create comment</button>
            <button onClick={onDeleteComment}>Delete comment</button>
            <button onClick={onEditComment}>Edit comment</button>
            {comments.map((comment) => (
                <TestComment comment={comment} key={comment.id} />
            ))}
        </>
    );
};

export default TestComments;
