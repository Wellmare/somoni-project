import React, { FC } from 'react';
import { ChangePasswordForm } from 'widgets/forms';

import s from './ChangePasswordPage.module.scss';

export const ChangePasswordPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <ChangePasswordForm />
        </div>
    );
};
