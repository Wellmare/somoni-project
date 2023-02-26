import { CommentContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import ReactQuill from 'react-quill';
import { FormEditComment } from 'widgets/forms';

export const CommentContent: FC = () => {
    const { comment, edit } = useContext(CommentContext);
    if (comment === null || edit === null) return null;

    const { content, commentId } = comment;
    const { setIsEdit, isEdit } = edit;

    return (
        <div className={classNames('px-2')}>
            {isEdit ? (
                <FormEditComment content={content} commentId={commentId} setIsEdit={setIsEdit} />
            ) : (
                // <div className={'text-wrap'}>{content}</div>
                <ReactQuill
                    value={content}
                    readOnly={true}
                    theme={'bubble'}
                    className={classNames('editor-no-styles', 'editor-post-content')}
                />
            )}
        </div>
    );
};
