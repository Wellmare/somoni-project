import React, { FC } from 'react';

import Routing from './components/Routing/Routing';
import TestFormCreatePost from './components/TestFormCreatePost';
import TestLogin from './components/TestLogin';
import TestPosts from './components/TestPosts';

const App: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const { loginUser, registerUser, logoutUser, isLoading, error } = useContext(AuthContext)!;
    // const [isAuth, req] = useWithAuth();
    //
    // const onRegister = (): void => {
    //     doAsyncFunc(async () => {
    //         await registerUser({
    //             username: 'username1',
    //             password: 'test12345',
    //             password2: 'test12345',
    //             email: 'test@gmail.com',
    //         });
    //     });
    // };
    //
    // const onLogin = (): void => {
    //     doAsyncFunc(async () => {
    //         await loginUser({
    //             username: 'username1',
    //             password: 'test12345',
    //         });
    //     });
    // };
    //
    // const onLogout = (): void => {
    //     logoutUser();
    // };
    //
    // const onPrivatePage = (): void => {
    //     if (!isAuth) return;
    //     req.get('test')
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };

    return (
        <>
            {/* {error.errorCode !== null ? error.errorCode : ''} */}
            {/* {error.errorMessage !== null ? error.errorMessage : ''} */}
            {/* {isLoading ? 'LOADING...' : ''} */}

            {/* <button onClick={onRegister}>REGISTER</button> */}
            {/* <button onClick={onLogin}>LOGIN</button> */}
            {/* <button onClick={onLogout}>LOGOUT</button> */}
            {/* <button onClick={onPrivatePage}>PRIVATE</button> */}
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TestLogin />
            <TestFormCreatePost />
            <TestPosts />
            <Routing />
        </>
    );
};

export default App;