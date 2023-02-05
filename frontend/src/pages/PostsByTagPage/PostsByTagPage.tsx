import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import SearchByTagForm from '../../components/forms/SearchByTagForm/SearchByTagForm';
import Posts from '../../components/posts/Posts/Posts';

const PostsByTagPage: FC = () => {
    const params = useParams();
    const tag = params.tag !== undefined ? params.tag.toLowerCase() : undefined;

    return (
        <div>
            <div className='on-mobile'>
                <div className={'flex justify-center mb-5'}>
                    <SearchByTagForm />
                </div>
            </div>
            <Posts tag={tag} />
        </div>
    );
};

export default PostsByTagPage;
