import { enhanceIPostServerResponse } from './enhanceIPostServerResponse';

import { IPost } from '../types/redux/posts/IPost';
import { IPaginatedProfileResponse } from '../types/redux/profile/IPaginatedProfileResponse';
import { IProfile } from '../types/redux/profile/IProfile';

export const enhanceIProfileServerResponse = (
    profileServerResponse: IPaginatedProfileResponse,
): { profile: IProfile; posts: IPost[] | null } => {
    const { results, isMyProfile, bio, id, email, username, photo, isEmailConfirmed } = profileServerResponse;

    const enhancedProfile: IProfile = {
        isMyProfile,
        profileId: id,
        email,
        username,
        bio,
        avatarLink: photo,
        isEmailConfirmed,
    };
    if (results === null) {
        return { posts: null, profile: enhancedProfile };
    }

    const posts = results.map((post) => {
        return enhanceIPostServerResponse(post);
    });

    return { posts, profile: enhancedProfile };
};
