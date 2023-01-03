import React, { FC, useContext } from 'react';

import Routing from './components/Routing/Routing';
import { AuthContext } from './context/authContext';
import useWithAuth from './hooks/useWithAuth';
import { doAsyncFunc } from './utils/doAsyncFunc';

const App: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { loginUser, registerUser, logoutUser, errorCode, errorMessage, loading } = useContext(AuthContext)!;
    const [tokenIs, req] = useWithAuth();

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
        if (!tokenIs) return;
        req.get('test')
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            {/* {errorCode !== 200 ? errorCode : ''} */}
            {/* {errorMessage} */}
            {/* <button onClick={onRegister}>REGISTER</button> */}
            {/* <button onClick={onLogin}>LOGIN</button> */}
            {/* <button onClick={onLogout}>LOGOUT</button> */}
            {/* <button onClick={onPrivatePage}>PRIVATE</button> */}
            <Routing />
        </>
    );
};

export default App;
