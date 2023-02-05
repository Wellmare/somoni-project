import classNames from 'classnames';
import React, { FC } from 'react';

import s from './CreatePostPage.module.scss';

import FormCreatePost from '../../components/forms/post/FormCreatePost/FormCreatePost';

const CreatePostPage: FC = () => {
    return (
        <div className={classNames('w-screen', 'sm:w-screen', 'md:w-9/12', 'lg:w-7/12', 'xl:w-6/12', s.maxWidth)}>
            <FormCreatePost />
        </div>
    );
};

export default CreatePostPage;
