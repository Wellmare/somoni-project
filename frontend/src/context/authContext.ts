import { createContext } from 'react';

import { IAuthContext } from '../types/login.types';

export const AuthContext = createContext<IAuthContext | null>(null);
