import React, { FC, useContext } from 'react';

import s from './PostImage.module.scss';

import { PostContext } from '../../../../context/PostContext';

const PostImage: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;

    const { postImageLink, title } = post;
    if (postImageLink === null) return null;

    return (
        <div className={s.container}>
            <a href={postImageLink} target={'_blank'} rel='noreferrer'>
                <img src={postImageLink} alt={title} className={s.image} />
            </a>
        </div>
    );
};

export default PostImage;
