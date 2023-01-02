import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
    ChangePasswordPage,
    LoginPage,
    MainPage,
    PostPage,
    ProfilePage,
    RegisterPage,
    RestorePasswordPage,
    WelcomePage,
} from '../../pages';
import Layout from '../Layout/Layout';

const Routing: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route path={''} element={<WelcomePage />} />
                <Route path={'main'} element={<MainPage />} />
                <Route path={'login'} element={<LoginPage />} />
                <Route path={'register'} element={<RegisterPage />} />
                <Route path={'post/:id'} element={<PostPage />} />
                <Route path={'profile'} element={<ProfilePage />} />
                <Route path={'profile/:id'} element={<ProfilePage />} />
                <Route path={'change-password'} element={<ChangePasswordPage />} />
                <Route path={'restore-password'} element={<RestorePasswordPage />} />
            </Route>
        </Routes>
    );
};

export default Routing;
