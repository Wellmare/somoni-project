import React, { FC } from 'react';
import ReactQuill from 'react-quill';

interface IContentProps {
    value: string;
}

const Content: FC<IContentProps> = ({ value }) => {
    return (
        <>
            <ReactQuill value={value} readOnly={true} theme={'bubble'} />
        </>
    );
};

export default Content;
