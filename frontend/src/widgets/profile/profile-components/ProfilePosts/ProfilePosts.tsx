import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC, useContext } from 'react';

import { Info } from 'shared/ui/Info';
import { Post } from 'widgets/post';

export const ProfilePosts: FC = () => {
    const { posts } = useContext(ProfileContext);

    return (
        <div>
            {posts !== null && posts.length > 0 ? (
                posts.map((post) => <Post post={post} key={post.postId} />)
            ) : (
                <Info>Постов пока нет</Info>
            )}
        </div>
    );
};
