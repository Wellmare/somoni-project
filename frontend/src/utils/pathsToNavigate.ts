import { PathsToNavigate } from '../constants/Paths';

export const pathsToNavigate = {
    user: (userId: string) => `${PathsToNavigate.USER}/${userId}`,
    post: (postId: string) => `${PathsToNavigate.POST}/${postId}`,
    tag: (tag: string) => `${PathsToNavigate.TAG}/${tag}`,
    editPost: (postId: string) => `${PathsToNavigate.EDIT_POST}/${postId}`,
};
