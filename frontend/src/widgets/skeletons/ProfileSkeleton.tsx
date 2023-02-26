import React, { FC } from 'react';

import { PostsSkeleton } from 'widgets/skeletons/PostsSkeleton';

import { ProfileInfoSkeleton } from './ProfileInfoSkeleton';

export const ProfileSkeleton: FC = () => {
    return (
        <>
            <ProfileInfoSkeleton />
            <PostsSkeleton />
        </>
    );
};
