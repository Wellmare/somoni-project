import React, { FC } from 'react';
import { RestorePasswordForm } from 'widgets/forms';

import s from './RestorePasswordPage.module.scss';

export const RestorePasswordPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <h1 className={'text-center bold text-2xl mt-8 mb-6'}>Восстановление пароля</h1>
            <RestorePasswordForm />
        </div>
    );
};
