import { createContext } from 'react';

import { IComment } from 'shared/types';
import { IEdit } from 'shared/types/IEdit';

interface ICommentContext {
    comment: IComment | null;
    edit: null | IEdit;
}

export const CommentContext = createContext<ICommentContext>({ comment: null, edit: null });
