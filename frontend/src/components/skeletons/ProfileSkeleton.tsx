import React, { FC } from 'react';

import PostsSkeletons from './PostsSkeletons';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';

const ProfileSkeleton: FC = () => {
    return (
        <>
            <ProfileInfoSkeleton />
            <PostsSkeletons />
        </>
    );
};

export default ProfileSkeleton;
