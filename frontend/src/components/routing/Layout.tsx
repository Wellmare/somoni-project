import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../header/Header/Header';

const Layout: FC = () => {
    return (
        <div className={'cont'}>
            <Header />
            <main className={'w-screen'}>
                <div className='container'>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
