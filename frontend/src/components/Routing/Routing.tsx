import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routingData } from '../../constants/routingData';
import { Paths } from '../../types/Paths';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const Routing: FC = () => {
    const routes = routingData.map(({ path, Element, withAuth }, i) => {
        if (withAuth === undefined) {
            return <Route path={path} element={<Element />} key={i} />;
        }
        return (
            <Route
                path={path}
                element={
                    <PrivateRoute
                        renderTerm={(isAuth) => (withAuth ? isAuth : !isAuth)}
                        pathWhenIncorrect={withAuth ? Paths.LOGIN : Paths.MAIN}
                    >
                        <Element />
                    </PrivateRoute>
                }
                key={i}
            />
        );
    });

    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                {routes}
            </Route>
        </Routes>
    );
};

export default Routing;
