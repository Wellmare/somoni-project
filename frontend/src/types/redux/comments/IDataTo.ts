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
