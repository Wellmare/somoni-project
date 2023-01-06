import { Link } from '../Link';

export interface IPost {
    id: number;
    title: string;
    content: string;
    likes: number;
    comments: number;
    image: Link;
    author: number;
    date: string;
    isLiked: boolean;
    username: string;
    photo: Link;
}
