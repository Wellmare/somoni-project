import classNames from 'classnames';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { PathsToNavigate } from '../../../../constants/Paths';
import { useLogin } from '../../../../hooks/useLogin';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../common/Button/Button';
import ButtonLink from '../../../common/ButtonLink/ButtonLink';
import FormInput from '../../../common/FormInput/FormInput';
import ServerResponse from '../../../common/ServerResponse/ServerResponse';
import Success from '../../../common/Success/Success';

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginForm: FC = () => {
    const { handleSubmit, control } = useForm<LoginFormInputs>({ mode: 'onBlur' });

    const { isLoading, loginUser, error, isError, isSuccess } = useLogin();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data): void => {
        loginUser({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                render={({ field, fieldState, formState }) => (
                    <FormInput
                        id={'username'}
                        error={fieldState.error}
                        label={'Никнейм'}
                        placeholder={'username'}
                        {...field}
                    />
                )}
                control={control}
                name={'username'}
                rules={{
                    required: {
                        value: true,
                        message: 'Поле обязательно',
                    },
                }}
            />

            <Controller
                render={({ field, fieldState, formState }) => (
                    <FormInput
                        id={'password'}
                        error={fieldState.error}
                        label={'Пароль'}
                        placeholder={'password'}
                        {...field}
                    />
                )}
                control={control}
                name={'password'}
                rules={{
                    required: {
                        value: true,
                        message: 'Поле обязательно',
                    },
                }}
            />
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={[
                    {
                        message: 'Неверный логин или пароль',
                        statusCode: 401,
                    },
                    {
                        message: 'Не хватает полей',
                        statusCode: 400,
                    },
                ]}
            >
                <Success>Успешный вход!</Success>
            </ServerResponse>

            {/* {error} */}
            <div className={classNames('flex', 'items-center', 'justify-between')}>
                <Button
                    color={ButtonColors.green}
                    size={ButtonSizes.sm}
                    // className={classNames('bg-cyan-700', 'py-1', 'px-4', 'rounded-md')}
                    type='submit'
                >
                    Войти
                </Button>
                <ButtonLink color={ButtonColors.blue} linkTo={PathsToNavigate.REGISTER}>
                    Еще не зарегистрирован?
                </ButtonLink>
            </div>
        </form>
    );
};

export default LoginForm;
