import { PathsToNavigate } from 'app/constants/Paths';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from 'shared/api/auth/authApiSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/reduxHooks';

import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { logout as logoutState, selectTokens } from 'shared/store/slices/authSlice';

interface IUseLogoutResponse {
    logoutUser: (data?: { refresh: string }) => void;
    isError: boolean;
    isSuccess: boolean;
}

export const useLogout = (): IUseLogoutResponse => {
    const refreshTokenFromState = useAppSelector(selectTokens)?.refresh;
    const dispatch = useAppDispatch();
    const [logout, { error, data, isError, isSuccess }] = useLogoutMutation();
    const navigate = useNavigate();

    const logoutUser = (data?: { refresh: string }): void => {
        doAsyncFunc(async () => {
            try {
                if (refreshTokenFromState === undefined && data === undefined) return null;
                const refresh =
                    data !== undefined
                        ? data.refresh
                        : refreshTokenFromState === undefined
                        ? ''
                        : refreshTokenFromState;

                await logout({ refresh }).unwrap();
                dispatch(logoutState());

                navigate(PathsToNavigate.MAIN);
                document.location.reload();
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
