import { PathsToNavigate } from '../constants/Paths';

export const pathsToNavigate = {
    user: (userId: string) => `${PathsToNavigate.USER}/${userId}}`,
    post: (postId: string) => `${PathsToNavigate.POST}/${postId}`,
};
