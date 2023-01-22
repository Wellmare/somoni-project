import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { PostContext } from '../../../../context/PostContext';
import PostTag from '../PostTag/PostTag';

const PostTags: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { tags } = post;

    return (
        <div className={classNames('flex', 'justify-start', 'items-center')}>
            {tags.map((tag) => (
                <PostTag tag={tag} key={tag} />
            ))}
        </div>
    );
};

export default PostTags;
