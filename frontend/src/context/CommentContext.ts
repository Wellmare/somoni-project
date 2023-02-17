import { createContext } from 'react';

import { IEdit } from '../types/IEdit';
import { IComment } from '../types/redux/comments/IComment';

interface ICommentContext {
    comment: IComment | null;
    edit: null | IEdit;
}

export const CommentContext = createContext<ICommentContext>({ comment: null, edit: null });
