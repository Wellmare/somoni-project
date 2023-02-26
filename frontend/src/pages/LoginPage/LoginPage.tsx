import React, { FC } from 'react';

import { LoginForm } from 'widgets/forms';

import s from './LoginPage.module.scss';

export const LoginPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <LoginForm />
        </div>
    );
};
