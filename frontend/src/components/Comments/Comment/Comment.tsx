import classNames from 'classnames';
import React, { FC, useState } from 'react';

import s from './Comment.module.scss';

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
        <div className={s.comment}>
            <div>
                <div className={classNames(s.avatar)}>{avatar != null && <img src={avatar} alt='avatar' />}</div>
                <p>{username}</p>
            </div>
            <div className={s.content}>{content}</div>
            {isMyComment && (
                <div className={'text-red-600'} onClick={onDelete}>
                    Delete
                </div>
            )}
        </>
    );
};

export default Comment;
