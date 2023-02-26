import React, { FC } from 'react';
import { RestorePasswordForm } from 'widgets/forms';

import s from './RestorePasswordPage.module.scss';

export const RestorePasswordPage: FC = () => {
    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <RestorePasswordForm />
        </div>
    );
};
