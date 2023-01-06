import React, { FC } from 'react';

import { useLikePostMutation, useUnlikePostMutation } from '../service/postApiSlice';
import { IPost } from '../types/redux/postsSlice.types';
import { doAsyncFunc } from '../utils/doAsyncFunc';

interface ITestPostProps {
    post: IPost;
}

const TestPost: FC<ITestPostProps> = ({ post }) => {
    const { content, date, id, image, likes, title, comments, author, isLiked, username } = post;
    const [like] = useLikePostMutation();
    const [unlike] = useUnlikePostMutation();

    const onLike = (): void => {
        doAsyncFunc(async () => {
            // const response = await turnLike({ id: id.toString() });\
            if (isLiked) {
                await unlike({ id: id.toString() });
            } else {
                await like({ id: id.toString() });
            }
        });
    };

    return (
        <div className='p-5' style={{ padding: '1rem', margin: '1rem' }}>
            {image != null && <img src={image} alt='post img' className={'max-h-72'} style={{ maxHeight: '300px' }} />}
            <p>Username: {username}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Title: {title}</p>
            <p>Content: {content}</p>
            <p>isLiked: {Number(isLiked)}</p>
            <button onClick={onLike}>Like</button>
            {/* <p>Date: {date}</p> */}
            {/* <p>content: {content}</p> */}
            {/* <p>id: {id}</p> */}
            {/* {image != null && ( */}
            {/*     <p> */}
            {/*         image: <img src={image} alt='image' style={{ maxWidth: '200px', maxHeight: '200px' }} /> */}
            {/*     </p> */}
            {/* )} */}
            {/* <p>Likes: {likes}</p> */}
            {/* <p>title: {title}</p> */}
            {/* <p>comments: {comments}</p> */}
            {/* <p>author: {author}</p> */}
        </div>
    );
};

export default TestPost;
