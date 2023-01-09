import { Link } from '../Link';
import { IPost } from '../posts/IPost';

export interface IProfile {
    count: number;
    username: string;
    photo: string | null;
    bio: string | null;
    results: IPost[] | null;
    next: Link;
    previous: Link;
}
