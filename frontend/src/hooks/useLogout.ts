import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './reduxHooks';

import { PathsToNavigate } from '../constants/Paths';
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
