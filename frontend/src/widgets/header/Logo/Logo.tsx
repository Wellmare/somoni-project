import { ReactComponent as LogoImg } from 'assets/svg/somoni-logo.svg';
import React, { FC } from 'react';

import s from './Logo.module.scss';

export const Logo: FC = () => {
    return (
        <>
            <LogoImg className={s.logo} />
        </>
    );
};
