import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Test from '../Test/Test';

const Routing: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route path={'/login'} element={<Test />} />
            </Route>
        </Routes>
    );
};

export default Routing;
