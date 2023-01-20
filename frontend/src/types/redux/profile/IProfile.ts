import { LinkType } from '../LinkType';
import { IPostServerResponse } from '../posts/IPostServerResponse';

export interface IProfile {
    next: LinkType;
    previous: LinkType;

    count: number;
    username: string;
    photo: string;
    bio: string | null;
    email?: string;
    isMyProfile: boolean;
    id: string;

    results: IPostServerResponse[] | null;
}
