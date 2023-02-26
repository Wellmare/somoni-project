import React, { FC } from 'react';
import { FormCreatePost } from 'widgets/forms';

import s from './CreatePostPage.module.scss';

export const CreatePostPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <FormCreatePost />
        </div>
    );
};
