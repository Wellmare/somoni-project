import classNames from 'classnames';
import React, { FC } from 'react';

import Menu from '../Menu/Menu';

const Header: FC = () => {
    return (
        <header className={classNames('p-5', 'flex', 'justify-between', 'bg-green-700', 'mb-3')}>
            header
            <Menu />
        </header>
    );
};

export default Header;
