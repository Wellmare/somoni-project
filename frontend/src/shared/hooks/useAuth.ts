import { useAppSelector } from 'shared/hooks';

import { selectIsAuth, selectUser, selectUserId } from 'shared/store/slices/authSlice';
import { IUserJWTDecode } from 'shared/types/auth';

interface IUseAuthResponse {
    isAuth: boolean;
    userId: string | null;
    user: IUserJWTDecode | null;
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
