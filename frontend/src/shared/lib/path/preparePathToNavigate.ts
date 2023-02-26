import { PathsToNavigate } from 'app/constants/Paths';

export const preparePathToNavigate = {
    user: (userId: string) => `${PathsToNavigate.USER}/${userId}`,
    post: (postId: string) => `${PathsToNavigate.POST}/${postId}`,
    tag: (tag: string) => `${PathsToNavigate.TAG}/${tag}`,
    editPost: (postId: string) => `${PathsToNavigate.EDIT_POST}/${postId}`,
};
