import { Link } from '../Link';

export interface IComment {
    id: number;
    content: string;
    date: string;
    author: number;
    post: number;
    photo: Link;
    username: string;
    isMyComment: boolean;
}
