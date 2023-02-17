export interface IComment {
    commentId: string;
    content: string;
    date: string;
    authorId: string;
    postId: number;
    avatarLink: string;
    username: string;
    isMyComment: boolean;
}
