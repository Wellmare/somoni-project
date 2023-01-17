import classNames from 'classnames';
import React, { FC } from 'react';

import PostTag from '../PostTag/PostTag';

interface IPostTagsProps {
    tags: string[];
}

const PostTags: FC<IPostTagsProps> = ({ tags }) => {
    return (
        <div className={classNames('flex', 'justify-start', 'items-center')}>
            {tags.map((tag) => (
                <PostTag tag={tag} key={tag} />
            ))}
        </div>
    );
};

export default PostTags;
