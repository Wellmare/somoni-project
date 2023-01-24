import { useAppDispatch, useAppSelector } from './reduxHooks';

import { logout as logoutState, selectTokens } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../service/authApiSlice';
import { doAsyncFunc } from '../utils/doAsyncFunc';

interface IUseLogoutResponse {
    logoutUser: (data?: { refresh: string }) => void;
    isError: boolean;
    isSuccess: boolean;
}

export const useLogout = (): IUseLogoutResponse => {
    const refreshTokenFromState = useAppSelector(selectTokens)?.refresh;
    const dispatch = useAppDispatch();
    const [logout, { error, data, isError, isSuccess }] = useLogoutMutation();

    const logoutUser = (data?: { refresh: string }): void => {
        doAsyncFunc(async () => {
            try {
                if (data?.refresh !== undefined) {
                    await logout({ refresh: data.refresh }).unwrap();
                } else if (refreshTokenFromState !== undefined) {
                    await logout({ refresh: refreshTokenFromState }).unwrap();
                }
                dispatch(logoutState());
            } catch (e) {
                logoutState();
            }
        });
    };

    return {
        logoutUser,
        isError,
        isSuccess,
    };
};
