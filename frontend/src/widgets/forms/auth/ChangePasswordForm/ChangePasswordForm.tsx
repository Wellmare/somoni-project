import { PathsToNavigate } from 'app/constants/Paths';
import { FormInput } from 'entities/inputs';
import { PasswordInput } from 'features/formInputs/PasswordInput';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useChangePasswordMutation } from 'shared/api/auth/authApiSlice';
import { ServerResponse } from 'shared/components';
import { ErrorsFromData } from 'shared/components/ErrorsFromData';
import { useAppSelector } from 'shared/hooks/reduxHooks';

import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { selectTokens } from 'shared/store/slices/authSlice';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { Success } from 'shared/ui/Success';

import s from './ChangePasswordForm.module.scss';

interface ChangePasswordInputs {
    password: string;
    password2: string;
    oldPassword: string;
}

export const ChangePasswordForm: FC = () => {
    const { handleSubmit, watch, control } = useForm<ChangePasswordInputs>({
        mode: 'onChange',
    });

    const [changePassword, { isSuccess, error, isError, isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const refresh = useAppSelector(selectTokens)?.refresh;

    const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
        const { password2, password, oldPassword } = data;

        if (refresh == null) {
            console.log('Refresh token not found');
            return;
        }
        doAsyncFunc(async () => {
            try {
                await changePassword({ oldPassword, password, password2, refresh }).unwrap();
                navigate(PathsToNavigate.MAIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={'mb-3'}>
                    <PasswordInput
                        control={control}
                        name={'oldPassword'}
                        label={'Старый пароль'}
                        placeholder={'old_password'}
                    />
                </div>
                <div className={'mb-3'}>
                    <PasswordInput control={control} name={'password'} label={'Новый пароль'} id={'new-password'} />
                </div>
                <div className={'mb-3'}>
                    <Controller
                        render={({ field, fieldState, formState }) => (
                            <FormInput
                                id={'new-password2'}
                                error={fieldState.error}
                                label={'Повтор пароля'}
                                placeholder={'password'}
                                {...field}
                                htmlProps={{ type: 'password' }}
                            />
                        )}
                        control={control}
                        name={'password2'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            validate: (value) => {
                                if (value !== watch('password')) {
                                    return 'Пароли не совпадают!';
                                }
                            },
                        }}
                    />
                </div>

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
                    <Success>Успешная смена пароля!</Success>
                </ServerResponse>

                <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'success'} className={'mt-3'}>
                    Изменить пароль
                </Button>
            </form>
        </>
    );
};
