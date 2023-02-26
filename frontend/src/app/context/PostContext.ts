import { createContext } from 'react';
import { IPost } from 'shared/types';
import { IEdit } from 'shared/types/IEdit';

interface IPostContext {
    post: IPost | null;
    edit: null | IEdit;
}

export const PostContext = createContext<IPostContext>({ post: null, edit: null });
