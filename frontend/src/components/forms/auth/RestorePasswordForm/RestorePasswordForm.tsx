import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import s from './RestorePasswordForm.module.scss';

import { useRestorePasswordMutation } from '../../../../service/authApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Success from '../../../../ui/Success/Success';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import EmailInput from '../../formInputs/EmailInput';

interface RestorePasswordInputs {
    email: string;
}

const RestorePasswordForm: FC = () => {
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

            <Button color={ButtonColors.green} size={ButtonSizes.md} type={'submit'} className={'mt-5'}>
                Восстановить пароль
            </Button>
        </form>
    );
};

export default RestorePasswordForm;
