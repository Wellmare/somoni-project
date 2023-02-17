import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import Info from '../../../../ui/Info/Info';
import Post from '../../../posts/post-components/Post/Post';

const ProfilePosts: FC = () => {
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

export default ProfilePosts;
