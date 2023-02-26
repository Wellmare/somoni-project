import { PostContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import ReactQuill from 'react-quill';

interface IPostContentProps {
    limitContentView: boolean;
}

export const PostContent: FC<IPostContentProps> = ({ limitContentView }) => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { content } = post;
    // console.log(content.split('<br>'));

    return (
        <>
            <ReactQuill
                value={content}
                readOnly={true}
                theme={'bubble'}
                className={classNames(
                    'editor-no-styles',
                    'editor-post-content',
                    limitContentView ? 'editor-limited' : '',
                )}
            />
        </>
    );
};
