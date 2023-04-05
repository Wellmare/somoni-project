import React, { FC } from 'react';

import { RegisterForm } from 'widgets/forms';

import s from './RegisterPage.module.scss';

export const RegisterPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <h1 className={'text-center bold text-2xl mt-4 mb-2'}>Регистрация</h1>
            <RegisterForm />
        </div>
    );
};
