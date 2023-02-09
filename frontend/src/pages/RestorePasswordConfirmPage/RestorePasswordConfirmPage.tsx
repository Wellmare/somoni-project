import classNames from 'classnames';
import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import s from './RestorePasswordConfirmPage.module.scss';

import RestorePasswordConfirmForm from '../../components/forms/auth/RestorePasswordConfirmForm/RestorePasswordConfirmForm';
import Error from '../../ui/Error/Error';

const RestorePasswordConfirmPage: FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    if (token === null) return <Error>Токен не найден!</Error>;

    return (
        <div className={classNames('w-screen', 'sm:w-screen', 'md:w-9/12', 'lg:w-7/12', 'xl:w-6/12', s.maxWidth)}>
            <RestorePasswordConfirmForm token={token} />
        </div>
    );
};

export default RestorePasswordConfirmPage;
