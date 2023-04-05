import React, { FC } from 'react';

import { LoginForm } from 'widgets/forms';

import s from './LoginPage.module.scss';

export const LoginPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <h1 className={'text-center bold text-2xl mt-4 mb-2'}>Вход</h1>
            <LoginForm />
        </div>
    );
};
