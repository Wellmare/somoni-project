import React, { FC } from 'react';

import { IPost } from '../types/redux/postsSlice.types';

interface ITestPostProps {
    post: IPost;
}

const TestPost: FC<ITestPostProps> = ({ post }) => {
    const { content, date, id, image, likes, title, comments, author } = post;
    return (
        <div>
            <p>Date: {date}</p>
            <p>content: {content}</p>
            <p>id: {id}</p>
            {image != null && (
                <p>
                    image: <img src={image} alt='image' style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </p>
            )}
            <p>Likes: {likes}</p>
            <p>title: {title}</p>
            <p>comments: {comments}</p>
            <p>author: {author}</p>
        </div>
    );
};

export default TestPost;
