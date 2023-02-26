import { CommentContext } from 'app/context';
import React, { FC, useState } from 'react';
import { useDeleteCommentMutation } from 'shared/api/comments/commentsApiSlice';

import { ICommentServerResponse } from 'shared/api/comments/types';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { IComment } from 'shared/types';

import { Card } from 'shared/ui/Card';

import s from './Comment.module.scss';

import { CommentContent, CommentHeader } from '../index';

interface ICommentProps {
    comment: ICommentServerResponse;
}

export const Comment: FC<ICommentProps> = ({ comment }) => {
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
            {/* <div className={s.comment}> */}
            <Card className={s.comment} id={enhancedComment.commentId}>
                <CommentHeader onDelete={onDelete} />
                <CommentContent />
            </Card>
            {/* </div> */}
        </CommentContext.Provider>
    );
};
