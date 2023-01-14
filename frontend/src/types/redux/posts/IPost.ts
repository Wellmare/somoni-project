import { Link } from '../Link';

type Tag = string;

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
    tags: Tag[];
    isMyPost: boolean;
}
