import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Posts from '../../components/posts/Posts/Posts';

const PostsByTagPage: FC = () => {
    const params = useParams();
    const tag = params.tag !== undefined ? params.tag.toLowerCase() : undefined;

    return <Posts tag={tag} />;
};

export default PostsByTagPage;
