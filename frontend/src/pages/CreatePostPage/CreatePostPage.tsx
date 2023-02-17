import React, { FC } from 'react';

import s from './CreatePostPage.module.scss';

import FormCreatePost from '../../components/forms/post/FormCreatePost/FormCreatePost';

const CreatePostPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <FormCreatePost />
        </div>
    );
};

export default CreatePostPage;
