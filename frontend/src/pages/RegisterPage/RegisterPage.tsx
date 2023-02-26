import React, { FC } from 'react';

import { RegisterForm } from 'widgets/forms';

import s from './RegisterPage.module.scss';

export const RegisterPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <RegisterForm />
        </div>
    );
};
