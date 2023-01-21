import { createContext } from 'react';

import { IProfileContext } from '../types/redux/profile/IProfileContext';

export const ProfileContext = createContext<IProfileContext>({ profile: null, posts: null });
