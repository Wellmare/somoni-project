import React, { FC } from 'react';
import { FormCreatePost } from 'widgets/forms';

import s from './CreatePostPage.module.scss';

export const CreatePostPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <h1 className={'text-center bold text-2xl mt-8 mb-6'}>Создание поста</h1>

            <FormCreatePost />
        </div>
    );
};
