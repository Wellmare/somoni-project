import { IPaginatedResponse } from '../IPaginatedResponse';
import { IPostServerResponse } from '../posts/IPostServerResponse';

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
}
