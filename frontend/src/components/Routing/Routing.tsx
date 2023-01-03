import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
    ChangePasswordPage,
    LoginPage,
    MainPage,
    PageNotFound,
    PostPage,
    ProfilePage,
    RegisterPage,
    RestorePasswordPage,
    WelcomePage,
} from '../../pages';
import { Paths } from '../../types/Paths';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const Routing: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route
                    path={Paths.WELCOME}
                    element={
                        <PrivateRoute pathWhenIncorrect={Paths.MAIN} renderTerm={(isAuth) => !isAuth}>
                            <WelcomePage />
                        </PrivateRoute>
                    }
                />
                <Route path={Paths.MAIN} element={<MainPage />} />
                <Route path={Paths.LOGIN} element={<LoginPage />} />
                <Route path={Paths.REGISTER} element={<RegisterPage />} />
                <Route path={`${Paths.POST}/:id`} element={<PostPage />} />
                <Route
                    path={Paths.PROFILE}
                    element={
                        <PrivateRoute pathWhenIncorrect={Paths.LOGIN} renderTerm={(isAuth) => isAuth}>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route path={`${Paths.PROFILE}/:id`} element={<ProfilePage />} />
                <Route
                    path={Paths.CHANGE_PASSWORD}
                    element={
                        <PrivateRoute renderTerm={(isAuth) => isAuth} pathWhenIncorrect={Paths.LOGIN}>
                            <ChangePasswordPage />
                        </PrivateRoute>
                    }
                />
                <Route path={Paths.RESTORE_PASSWORD} element={<RestorePasswordPage />} />
                <Route path={'*'} element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default Routing;
