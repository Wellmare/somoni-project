import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Posts from '../../components/Posts/Posts/Posts';

const PostsByTagPage: FC = () => {
    const params = useParams();
    const tag = params.tag;

    return <Posts tag={tag} />;
};

export default PostsByTagPage;
