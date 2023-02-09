import classNames from 'classnames';
import React, { FC } from 'react';

import s from './RestorePasswordPage.module.scss';

import RestorePasswordForm from '../../components/forms/auth/RestorePasswordForm/RestorePasswordForm';

const RestorePasswordPage: FC = () => {
    return (
        <div className={classNames('w-screen', 'sm:w-screen', 'md:w-9/12', 'lg:w-7/12', 'xl:w-6/12', s.maxWidth)}>
            <RestorePasswordForm />
        </div>
    );
};

export default RestorePasswordPage;
