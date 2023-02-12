import React, { FC } from 'react';

import s from './LoginPage.module.scss';

import LoginForm from '../../components/forms/auth/LoginForm/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
