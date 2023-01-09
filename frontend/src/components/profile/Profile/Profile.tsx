import React, { FC } from 'react';

import { IProfile } from '../../../types/redux/profile/IProfile';
import Post from '../../Posts/Post/Post';

interface IProfileProps {
    profile: IProfile;
}

const Profile: FC<IProfileProps> = ({ profile }) => {
    const { bio, username, photo, results: posts } = profile;

    return (
        <div>
            {photo !== null && <img src={photo} alt='profile photo' />}
            {username}
            {bio}
            {posts?.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Profile;
