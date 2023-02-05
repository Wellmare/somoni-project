import classNames from 'classnames';
import React, { FC } from 'react';

import s from './RegisterPage.module.scss';

import RegisterForm from '../../components/forms/auth/RegisterForm/RegisterForm';

const RegisterPage: FC = () => {
    return (
        <div className={classNames('w-screen', 'sm:w-screen', 'md:w-9/12', 'lg:w-7/12', 'xl:w-6/12', s.maxWidth)}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
