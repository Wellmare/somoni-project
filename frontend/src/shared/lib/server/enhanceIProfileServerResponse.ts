import { IPaginatedProfileResponse } from 'shared/api/user/types/IPaginatedProfileResponse';
import { enhanceIPostServerResponse } from 'shared/lib/server/enhanceIPostServerResponse';

import { IProfile } from 'shared/types';
import { IPost } from 'shared/types/IPost';

export const enhanceIProfileServerResponse = (
    profileServerResponse: IPaginatedProfileResponse,
): { profile: IProfile; posts: IPost[] | null } => {
    const {
        results,
        isMyProfile,
        bio,
        id,
        email,
        username,
        photo,
        isEmailConfirmed,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        count_followers,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        count_following,
        isFollowed,
    } = profileServerResponse;

    const enhancedProfile: IProfile = {
        isMyProfile,
        profileId: id,
        email,
        username,
        bio,
        avatarLink: photo,
        isEmailConfirmed,
        countFollowers: count_followers,
        countFollowing: count_following,
        isFollowed,
    };
    if (results === null) {
        return { posts: null, profile: enhancedProfile };
    }

    const posts = results.map((post) => {
        return enhanceIPostServerResponse(post);
    });

    return { posts, profile: enhancedProfile };
};