import React, { FC } from 'react';

import { useAppDispatch } from '../hooks/reduxHooks';
import { logout, setAuthTokens } from '../redux/slices/authSlice';
import { useLoginMutation, useRegisterMutation } from '../service/authApiSlice';
import { doAsyncFunc } from '../utils/doAsyncFunc';

const TestLogin: FC = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const [register] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const handleLogin = (): void => {
        doAsyncFunc(async () => {
            try {
                const res = await login({
                    username: 'username1',
                    password: 'test12345',
                }).unwrap();
                console.log(res);
                dispatch(setAuthTokens(res));
            } catch (e) {
                console.log(e);
            }
        });
    };

    const handleRegister = (): void => {
        doAsyncFunc(async () => {
            try {
                const res = await register({
                    username: 'username3',
                    password: 'test12345',
                    password2: 'test12345',
                    email: 'tetette@tfgdgdfg.com',
                }).unwrap();
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        });
    };

    // const handleTest = (): void => {
    //     doAsyncFunc(async () => {
    //         try {
    //             await test(undefined);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     });
    // };

    const handleLogout = (): void => {
        dispatch(logout());
    };

    return (
        <>
            {isLoading ? 'Loading...' : ''}
            {error != null ? error : ''}
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default TestLogin;
