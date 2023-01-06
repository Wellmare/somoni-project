import { IPaginatedResponse, Link } from '../IPaginatedResponse';

export interface IDataToGetPosts {
    page: number;
}
export interface IDataToEditPost {
    id: number;
    formData: FormData;
}
export interface IDataToDelete {
    id: number;
}

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

export type IPosts = IPaginatedResponse<IPost[]>;
