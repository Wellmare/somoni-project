import React, { FC } from 'react';

import { IComment } from '../../../types/redux/comments/IComment';

interface ICommentProps {
    comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
    const { content, author, id, date, photo: avatar, username } = comment;
    return (
        <>
            {avatar != null && <img src={avatar} alt='avatar' />}
            <p>{username}</p>
            <p>{content}</p>
        </>
    );
};

export default Comment;
