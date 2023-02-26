import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC } from 'react';

import { IPaginatedProfileResponse } from 'shared/api/user/types/IPaginatedProfileResponse';
import { enhanceIProfileServerResponse } from 'shared/lib/server/enhanceIProfileServerResponse';

import { ProfileHeader, ProfilePosts } from '../index';
interface IProfileProps {
    profile: IPaginatedProfileResponse;
}

export const Profile: FC<IProfileProps> = ({ profile }) => {
    const { profile: enhancedProfile, posts } = enhanceIProfileServerResponse(profile);

    return (
        <ProfileContext.Provider value={{ profile: enhancedProfile, posts }}>
            {/* <div className={'w-screen'}> */}
            <div className={'mb-4'}>
                <ProfileHeader />
            </div>
            <ProfilePosts />
            {/* </div> */}
        </ProfileContext.Provider>
    );
};
