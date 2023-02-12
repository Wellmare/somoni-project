import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { CommentContext } from '../../../../context/CommentContext';
import FormEditComment from '../../../forms/comments/FormEditComment/FormEditComment';

const CommentContent: FC = () => {
    const { comment, edit } = useContext(CommentContext);
    if (comment === null || edit === null) return null;

    const { content, commentId } = comment;
    const { setIsEdit, isEdit } = edit;

    return (
        <div className={classNames('px-2')}>
            {isEdit ? (
                <FormEditComment content={content} commentId={commentId} setIsEdit={setIsEdit} />
            ) : (
                <div className={'text-wrap'}>{content}</div>
            )}
        </div>
    );
};

export default CommentContent;
