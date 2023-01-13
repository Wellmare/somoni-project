import { useAppSelector } from './reduxHooks';

import { selectIsAuth, selectUser, selectUserId } from '../redux/slices/authSlice';
import { IUserJWTDecodeResponse } from '../types/redux/auth/IUserJWTDecodeResponse';

interface IUseAuthResponse {
    isAuth: boolean;
    userId: string | null;
    user: IUserJWTDecodeResponse | null;
}

export const useAuth = (): IUseAuthResponse => {
    const isAuth = useAppSelector(selectIsAuth);
    const userId = useAppSelector(selectUserId);
    const user = useAppSelector(selectUser);

    return {
        isAuth,
        userId,
        user,
    };
};
