import React, { FC } from 'react';
import ReactQuill from 'react-quill';

interface IContentProps {
    value: string;
    [x: string]: any;
}

const PostContent: FC<IContentProps> = ({ value, ...props }) => {
    return (
        <>
            <ReactQuill value={value} readOnly={true} theme={'bubble'} {...props} />
        </>
    );
};

export default PostContent;
