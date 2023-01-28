import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../header/Header/Header';

const Layout: FC = () => {
    return (
        <div>
            <Header />
            <main className={'flex justify-center items-center'}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
