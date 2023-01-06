import { IPaginatedResponse, Link } from '../IPaginatedResponse';

export interface IComment {
    id: number;
    content: string;
    date: string;
    author: number;
    post: number;
    photo: Link;
}

export type IComments = IPaginatedResponse<IComment[]>;

export interface IDataToGetComments {
    postId: string;
}
export interface IDataToCreateComment {
    postId: string;
    content: string;
}
export interface IDataToDeleteComment {
    commentId: string;
}
export interface IDataToEditComment {
    commentId: string;
    content: string;
}
