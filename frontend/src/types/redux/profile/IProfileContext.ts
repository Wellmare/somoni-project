import { IProfile } from './IProfile';

import { IPost } from '../posts/IPost';

export interface IProfileContext {
    profile: IProfile | null;
    posts: null | IPost[];
}
