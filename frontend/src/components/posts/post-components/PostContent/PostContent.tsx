import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import ReactQuill from 'react-quill';

import { PostContext } from '../../../../context/PostContext';

const PostContent: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { content } = post;

    return (
        <>
            <ReactQuill
                value={content}
                readOnly={true}
                theme={'bubble'}
                className={classNames('editor-no-styles', 'editor-post-content')}
            />
        </>
    );
};

export default PostContent;
