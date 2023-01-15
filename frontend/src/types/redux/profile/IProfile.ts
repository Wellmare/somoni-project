import { LinkType } from '../LinkType';
import { IPost } from '../posts/IPost';

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

    results: IPost[] | null;
}
