import React, { FC } from 'react';

import { IComment } from '../types/redux/comments/IComment';

interface ITestCommentProps {
    comment: IComment;
}

const TestComment: FC<ITestCommentProps> = ({ comment: { id, date, content, author } }) => {
    return (
        <div style={{ display: 'flex' }}>
            <p>id: {id}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Content: {content}</p>
            <p>Author: {author}</p>
        </div>
    );
};

export default TestComment;
