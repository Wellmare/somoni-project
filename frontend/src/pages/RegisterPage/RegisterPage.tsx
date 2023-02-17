import React, { FC } from 'react';

import s from './RegisterPage.module.scss';

import RegisterForm from '../../components/forms/auth/RegisterForm/RegisterForm';

const RegisterPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
