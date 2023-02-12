import React, { FC, useState } from 'react';

import s from './Comment.module.scss';

import { CommentContext } from '../../../../context/CommentContext';
import { useDeleteCommentMutation } from '../../../../service/commentsApiSlice';
import { IComment } from '../../../../types/redux/comments/IComment';
import { ICommentServerResponse } from '../../../../types/redux/comments/ICommentServerResponse';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import CommentContent from '../CommentContent/CommentContent';
import CommentHeader from '../CommentHeader/CommentHeader';

interface ICommentProps {
    comment: ICommentServerResponse;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
    const { content, author, id, date, photo, username, isMyComment, post } = comment;
    const [deleteComment] = useDeleteCommentMutation();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onDelete = (): void => {
        doAsyncFunc(async () => {
            await deleteComment({ commentId: id.toString() });
        });
    };

    const enhancedComment: IComment = {
        isMyComment,
        commentId: id.toString(),
        username,
        date,
        avatarLink: photo,
        content,
        authorId: author.toString(),
        postId: post,
    };
    const editComment = {
        isEdit,
        setIsEdit,
    };

    return (
        <CommentContext.Provider
            value={{
                comment: enhancedComment,
                edit: editComment,
            }}
        >
            <div className={s.comment}>
                <CommentHeader onDelete={onDelete} />
                <CommentContent />
            </div>
        </CommentContext.Provider>
    );
};

export default Comment;
