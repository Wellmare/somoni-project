import React, { createContext } from 'react';

import { IComment } from '../types/redux/comments/IComment';

interface ICommentContext {
    comment: IComment | null;
    edit: null | {
        isEdit: boolean;
        setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    };
}

export const CommentContext = createContext<ICommentContext>({ comment: null, edit: null });
