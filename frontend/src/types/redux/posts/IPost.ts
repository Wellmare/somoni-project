import { Tag } from '../../Tag';
import { LinkType } from '../LinkType';

export interface IPost {
    postId: string;

    title: string;
    content: string;

    likesCount: number;
    commentsCount: number;

    postImageLink: LinkType;

    userId: string;
    username: string;
    avatarLink: string;

    dateString: string;
    isLiked: boolean;

    isMyPost: boolean;

    tags: Tag[];
}
