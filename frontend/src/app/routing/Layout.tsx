import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from 'widgets/Footer';
import { Header } from 'widgets/header';

export const Layout: FC = () => {
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
