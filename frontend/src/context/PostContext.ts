import { createContext } from 'react';

import { IEdit } from '../types/IEdit';
import { IPost } from '../types/redux/posts/IPost';

interface IPostContext {
    post: IPost | null;
    edit: null | IEdit;
}

export const PostContext = createContext<IPostContext>({ post: null, edit: null });
