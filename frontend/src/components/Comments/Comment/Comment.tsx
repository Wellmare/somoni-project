import React, { FC } from 'react';

import { useDeleteCommentMutation } from '../../../service/commentsApiSlice';
import { IComment } from '../../../types/redux/comments/IComment';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';

interface ICommentProps {
    comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
    const { content, author, id, date, photo: avatar, username, isMyComment } = comment;
    const [deleteComment] = useDeleteCommentMutation();

    console.log(isMyComment);

    const onDelete = (): void => {
        doAsyncFunc(async () => {
            await deleteComment({ commentId: id.toString() });
        });
    };

    return (
        <>
            {avatar != null && <img src={avatar} alt='avatar' />}
            <p>{username}</p>
            <p>{content}</p>
            {isMyComment && (
                <div className={'text-red-600'} onClick={onDelete}>
                    Delete
                </div>
            )}
        </>
    );
};

export default Comment;
