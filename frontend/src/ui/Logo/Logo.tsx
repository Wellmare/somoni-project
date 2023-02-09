import React, { FC } from 'react';

import s from './Logo.module.scss';

import { ReactComponent as LogoImg } from '../../assets/svg/somoni-logo.svg';

const Logo: FC = () => {
    return (
        <>
            <LogoImg className={s.logo} />
        </>
    );
};

export default Logo;
