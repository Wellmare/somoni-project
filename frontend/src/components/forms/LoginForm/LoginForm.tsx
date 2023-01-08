import classNames from 'classnames';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useLogin } from '../../../hooks/useLogin';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginForm: FC = () => {
    const { handleSubmit, control } = useForm<LoginFormInputs>({ mode: 'onBlur' });

    const { isLoading, loginUser, error } = useLogin();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data): void => {
        loginUser({ username: data.username, password: data.password });
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
                    minLength: {
                        value: 8,
                        message: 'Минимальная длинна пароля 8 символов',
                    },
                }}
            />

            <p>{isLoading && 'Загрузка...'}</p>
            <p>{error?.status === 401 && <Error>Неверный логин или пароль</Error>}</p>
            <p>{error?.status === 400 && <Error>Не хватает полей</Error>}</p>
            <p>{error?.status === 'FETCH_ERROR' && <Error>Не удалось получить ответ от сервера</Error>}</p>

            {/* {error} */}
            <button className={classNames('bg-cyan-700', 'py-1', 'px-4', 'rounded-md')} type='submit'>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
