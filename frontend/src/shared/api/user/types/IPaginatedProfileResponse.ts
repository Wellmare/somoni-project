import { IPostServerResponse } from 'shared/api/post/types/IPostServerResponse';
import { IPaginatedResponse } from 'shared/types/server/IPaginatedResponse';

export interface IPaginatedProfileResponse extends IPaginatedResponse<IPostServerResponse[] | null> {
    username: string;
    photo: string;
    bio: string | null;
    email?: string;
    isMyProfile: boolean;
    id: string;
    isEmailConfirmed: boolean;
    count_followers: number;
    count_following: number;
    isFollowed: boolean;
}
