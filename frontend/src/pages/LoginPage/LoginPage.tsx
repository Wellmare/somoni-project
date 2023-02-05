import classNames from 'classnames';
import React, { FC } from 'react';

import s from './LoginPage.module.scss';

import LoginForm from '../../components/forms/auth/LoginForm/LoginForm';

const LoginPage: FC = () => {
    return (
        <div className={classNames('w-screen', 'sm:w-screen', 'md:w-9/12', 'lg:w-7/12', 'xl:w-6/12', s.maxWidth)}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
