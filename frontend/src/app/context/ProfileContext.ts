import { createContext } from 'react';

import { IPost, IProfile } from 'shared/types';

interface IProfileContext {
    profile: IProfile | null;
    posts: null | IPost[];
}

export const ProfileContext = createContext<IProfileContext>({ profile: null, posts: null });
