import { PathsToNavigate } from 'app/constants/Paths';
import { FormInput } from 'entities/inputs';
import { PasswordInput } from 'features/formInputs';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useRestorePasswordConfirmMutation } from 'shared/api/auth/authApiSlice';
import { ErrorsFromData, ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { Loader, LoaderSize } from 'shared/ui/Loader';
import { Success } from 'shared/ui/Success';

interface RestorePasswordConfirmInputs {
    password: string;
    password2: string;
}

interface IRestorePasswordConfirmFormProps {
    token: string;
}

export const RestorePasswordConfirmForm: FC<IRestorePasswordConfirmFormProps> = ({ token }) => {
    console.log(token);
    const { handleSubmit, watch, control } = useForm<RestorePasswordConfirmInputs>({
        mode: 'onChange',
    });

    const [confirmRestorePassword, { isSuccess, error, isError, isLoading }] = useRestorePasswordConfirmMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RestorePasswordConfirmInputs> = (data) => {
        const { password2, password } = data;

        doAsyncFunc(async () => {
            try {
                await confirmRestorePassword({ password2, password, token }).unwrap();
                navigate(PathsToNavigate.LOGIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    loader={<Loader size={LoaderSize.sm} />}
                    messages={[
                        {
                            statusCode: 401,
                            message: 'Неправильный токен!',
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

                <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'success'}>
                    Изменить пароль
                </Button>
            </form>
        </>
    );
};
