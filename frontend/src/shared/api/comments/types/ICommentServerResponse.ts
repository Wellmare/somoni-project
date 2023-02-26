export interface ICommentServerResponse {
    id: number;
    content: string;
    date: string;
    author: number;
    post: number;
    photo: string;
    username: string;
    isMyComment: boolean;
}
