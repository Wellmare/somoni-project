import { Link } from '../Link';
import { IPost } from '../posts/IPost';

export interface IProfile {
    next: Link;
    previous: Link;

    count: number;
    username: string;
    photo: string | null;
    bio: string | null;
    email?: string;
    isMyProfile: boolean;
    id: string;

    results: IPost[] | null;
}
