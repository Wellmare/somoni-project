import React, { FC } from 'react';

import s from './RestorePasswordPage.module.scss';

import RestorePasswordForm from '../../components/forms/auth/RestorePasswordForm/RestorePasswordForm';

const RestorePasswordPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <RestorePasswordForm />
        </div>
    );
};

export default RestorePasswordPage;
