import { LinkType } from '../LinkType';

type Tag = string;

export interface IPost {
    id: number;
    title: string;
    content: string;
    likes: number;
    comments: number;
    image: LinkType;
    author: number;
    date: string;
    isLiked: boolean;
    username: string;
    photo: string;
    tags: Tag[];
    isMyPost: boolean;
}
