import React, { FC } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import { IPaginatedProfileResponse } from '../../../../types/redux/profile/IPaginatedProfileResponse';
import { enhanceIProfileServerResponse } from '../../../../utils/enhanceIProfileServerResponse';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePosts from '../ProfilePosts/ProfilePosts';

interface IProfileProps {
    profile: IPaginatedProfileResponse;
}

const Profile: FC<IProfileProps> = ({ profile }) => {
    const { profile: enhancedProfile, posts } = enhanceIProfileServerResponse(profile);

    return (
        <ProfileContext.Provider value={{ profile: enhancedProfile, posts }}>
            <div>
                <div className={'mb-4'}>
                    <ProfileHeader />
                </div>
                <ProfilePosts />
            </div>
        </ProfileContext.Provider>
    );
};

export default Profile;
