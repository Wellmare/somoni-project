import React, { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './Comment.module.scss';

import { useDeleteCommentMutation } from '../../../../service/commentsApiSlice';
import { IComment } from '../../../../types/redux/comments/IComment';
import { AvatarSize } from '../../../../types/UI/Avatar.types';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import Avatar from '../../../common/Avatar/Avatar';
import FormEditComment from '../../../forms/comments/FormEditComment/FormEditComment';
import CommentDeleteButton from '../CommentDeleteButton/CommentDeleteButton';
import CommentEditButton from '../CommentEditButton/CommentEditButton';

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
            <Link to={pathsToNavigate.user(author.toString())}>
                <Avatar size={AvatarSize.small}>
                    <img src={avatar} alt={username} />
                </Avatar>
                <p>{username}</p>
            </Link>
            {isEdit ? (
                <FormEditComment content={content} commentId={id.toString()} setIsEdit={setIsEdit} />
            ) : (
                <div className={s.content}>{content}</div>
            )}

            {isMyComment && !isEdit && <CommentDeleteButton onDelete={onDelete} />}
            {isMyComment && <CommentEditButton setIsEdit={setIsEdit} />}
        </div>
    );
};

export default Comment;
