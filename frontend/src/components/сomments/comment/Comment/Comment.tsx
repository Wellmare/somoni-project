import React, { FC, useState } from 'react';

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
        authorId: id.toString(),
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
            <div>
                {/* <Link to={pathsToNavigate.user(author.toString())}> */}
                {/*     <Avatar size={AvatarSize.small}> */}
                {/*         <img src={avatar} alt={username} /> */}
                {/*     </Avatar> */}
                {/*     <p>{username}</p> */}
                {/* </Link> */}
                {/* {isEdit ? ( */}
                {/*     <FormEditComment content={content} commentId={id.toString()} setIsEdit={setIsEdit} /> */}
                {/* ) : ( */}
                {/*     <div className={s.content}>{content}</div> */}
                {/* )} */}

                {/* {isMyComment && !isEdit && <CommentDeleteButton onDelete={onDelete} />} */}
                {/* {isMyComment && <CommentEditButton setIsEdit={setIsEdit} />} */}
                <CommentHeader onDelete={onDelete} />
                <CommentContent />
            </div>
        </CommentContext.Provider>
    );
};

export default Comment;
