import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { SearchByTagForm } from 'widgets/forms';
import { PostsByPage } from 'widgets/PostsByPage';

export const PostsByTagPage: FC = () => {
    const params = useParams();
    const tag = params.tag !== undefined ? params.tag.toLowerCase() : undefined;

    return (
        <div>
            <div className='on-mobile'>
                <div className={'flex justify-center mb-5'}>
                    <SearchByTagForm />
                </div>
            </div>
            <h1 className={'text-center bold text-2xl mt-8 mb-6'}>Посты по тегу: {tag}</h1>
            <PostsByPage tag={tag} />
        </div>
    );
};
