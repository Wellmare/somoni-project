import classNames from 'classnames';
import React, { FC, useState } from 'react';

import s from './Comment.module.scss';

import { useDeleteCommentMutation } from '../../../service/commentsApiSlice';
import { IComment } from '../../../types/redux/comments/IComment';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import FormEditComment from '../../forms/FormEditComment/FormEditComment';

interface ICommentProps {
    comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
    const { content, author, id, date, photo: avatar, username, isMyComment } = comment;
    const [deleteComment] = useDeleteCommentMutation();

    const [isEdit, setIsEdit] = useState<boolean>(false);

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
            {isEdit ? (
                <FormEditComment commentId={id.toString()} setIsEdit={setIsEdit} />
            ) : (
                <div className={s.content}>{content}</div>
            )}

            {isMyComment && !isEdit && (
                <div className={classNames('text-red-600', 'cursor-pointer')} onClick={onDelete}>
                    Delete
                </div>
            )}
            {isMyComment && (
                <div className={classNames('cursor-pointer', 'ml-5')} onClick={() => setIsEdit((old) => !old)}>
                    Edit
                </div>
            )}
        </div>
    );
};

export default Comment;
