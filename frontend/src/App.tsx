import React, { FC, useContext } from 'react';

import Test from './components/Test/Test';
import { AuthContext } from './context/authContext';
import useWithAuth from './hooks/useWithAuth';
import { doAsyncFunc } from './utils/doAsyncFunc';

const App: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { loginUser, registerUser, logoutUser, errorCode, errorMessage } = useContext(AuthContext)!;
    const req = useWithAuth();

    const onRegister = (): void => {
        doAsyncFunc(async () => {
            await registerUser({
                username: 'username1',
                password: 'test12345',
                password2: 'test12345',
                email: 'test@gmail.com',
            });
        });
    };

    const onLogin = (): void => {
        doAsyncFunc(async () => {
            await loginUser({
                username: 'username1',
                password: 'test12345',
            });
        });
    };

    const onLogout = (): void => {
        logoutUser();
    };

    const onPrivatePage = (): void => {
        doAsyncFunc(async () => {
            const res = await req.get('test');
            console.log(res);
        });
    };

    // useEffect(() => {
    //
    // }, [errorCode])

    return (
        <>
            {errorCode !== 200 ? errorCode : ''}
            {errorMessage}
            <button onClick={onRegister}>REGISTER</button>
            <button onClick={onLogin}>LOGIN</button>
            <button onClick={onLogout}>LOGOUT</button>
            <button onClick={onPrivatePage}>PRIVATE</button>
            <Test />
        </>
    );
};

export default App;
