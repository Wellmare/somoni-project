import { LinkType } from 'shared/types/server/LinkType';

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
    tags: string[];
    isMyPost: boolean;
}
