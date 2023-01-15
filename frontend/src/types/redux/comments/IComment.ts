import { LinkType } from '../LinkType';

export interface IComment {
    id: number;
    content: string;
    date: string;
    author: number;
    post: number;
    photo: LinkType;
    username: string;
    isMyComment: boolean;
}
