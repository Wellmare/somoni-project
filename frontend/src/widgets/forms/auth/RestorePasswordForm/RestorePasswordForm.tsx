import { EmailInput } from 'features/formInputs';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRestorePasswordMutation } from 'shared/api/auth/authApiSlice';

import { ErrorsFromData, ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { Loader, LoaderSize } from 'shared/ui/Loader';
import { Success } from 'shared/ui/Success';

import s from './RestorePasswordForm.module.scss';

interface RestorePasswordInputs {
    email: string;
}

export const RestorePasswordForm: FC = () => {
    const { control, handleSubmit } = useForm<RestorePasswordInputs>({ mode: 'onBlur' });

    const [restorePassword, { isSuccess, error, isError, isLoading }] = useRestorePasswordMutation();

    const onSubmit: SubmitHandler<RestorePasswordInputs> = ({ email }) => {
        console.log(email);
        doAsyncFunc(async () => {
            try {
                await restorePassword({ email }).unwrap();
                // navigate(PathsToNavigate.LOGIN);
            } catch (e) {
                console.log(e);
            }
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <EmailInput control={control} />

            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                loader={<Loader size={LoaderSize.sm} />}
                messages={[
                    {
                        statusCode: 401,
                        message: 'Неверные данные',
                    },
                    {
                        statusCode: 400,
                        message: 'Не хватает полей',
                        customFunc: (errorResponse) => <ErrorsFromData errorsData={errorResponse.data} />,
                    },
                ]}
            >
                <Success>Письмо должно прийти на почту!</Success>
            </ServerResponse>

            <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'submit'} className={'mt-5'}>
                Восстановить пароль
            </Button>
        </form>
    );
};
