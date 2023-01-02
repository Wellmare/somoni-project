import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <div>
            <header>header</header>
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </div>
    );
};

export default Layout;
