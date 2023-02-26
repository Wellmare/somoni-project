import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Error } from 'shared/ui/Error';
import { RestorePasswordConfirmForm } from 'widgets/forms';

import s from './RestorePasswordConfirmPage.module.scss';

export const RestorePasswordConfirmPage: FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    if (token === null) return <Error>Токен не найден!</Error>;

    return (
        <div className={`${s.maxWidth} mx-auto`}>
            <RestorePasswordConfirmForm token={token} />
        </div>
    );
};
