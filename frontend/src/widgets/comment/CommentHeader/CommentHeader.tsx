import { CommentContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';
import { getLocalDateFromString } from 'shared/lib/string/getLocalDateFromString';

import { Avatar, AvatarSize } from 'shared/ui/Avatar';

import { CommentDeleteButton, CommentEditButton } from '../index';

interface IPostHeaderProps {
    onDelete: () => void;
}

export const CommentHeader: FC<IPostHeaderProps> = ({ onDelete }) => {
    const { comment, edit } = useContext(CommentContext);
    if (comment === null || edit === null) {
        return null;
    }

    const { isMyComment, username, date, avatarLink, commentId, content, authorId, postId } = comment;
    const { setIsEdit, isEdit } = edit;

    return (
        <div className={classNames('flex', 'justify-between', 'items-center', 'w-full')}>
            <Link
                to={preparePathToNavigate.user(authorId)}
                className={classNames('flex', 'justify-start', 'items-center')}
            >
                <Avatar size={AvatarSize.small}>
                    <img src={avatarLink} alt={username} />
                </Avatar>
                <div className={'ml-3'}>
                    <p>{username}</p>
                    <p>{getLocalDateFromString(date)}</p>
                </div>
            </Link>
            <div className={classNames('flex', 'justify-center', 'items-center')}>
                {isMyComment && <CommentEditButton setIsEdit={setIsEdit} />}
                {isMyComment && !isEdit && <CommentDeleteButton onDelete={onDelete} />}
            </div>
        </div>
    );
};
