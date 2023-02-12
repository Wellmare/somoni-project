import React, { FC } from 'react';

import s from './ChangePasswordPage.module.scss';

import ChangePasswordForm from '../../components/forms/auth/ChangePasswordForm/ChangePasswordForm';

const ChangePasswordPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <ChangePasswordForm />
        </div>
    );
};

export default ChangePasswordPage;
