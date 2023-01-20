import { Tag } from '../../Tag';
import { LinkType } from '../LinkType';

export interface IPostServerResponse {
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
