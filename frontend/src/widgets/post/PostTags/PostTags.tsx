import { PostContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { PostTag } from '../index';

export const PostTags: FC = () => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { tags } = post;

    return (
        <div className={classNames('flex', 'justify-start', 'items-center', 'flex-wrap')}>
            {tags.map((tag) => (
                <PostTag tag={tag} key={tag} />
            ))}
        </div>
    );
};
