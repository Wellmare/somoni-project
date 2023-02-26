import { LinkType } from 'shared/types/server';

export interface IDataToGetProfile {
    userId: string;
    postsPage?: number;
}

export interface IDataToGetProfileInfo {
    userId: string;
}

export interface IDataToFollowing {
    userId: string;
}

export interface IDataToEditProfile {
    email: string;
    username: string;
    photo: LinkType;
    bio: string;
    id?: string;
}
